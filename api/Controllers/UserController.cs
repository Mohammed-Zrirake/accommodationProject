using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Json;
using System.Security.Claims;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.User;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _configuration;
        private readonly IHttpClientFactory _httpClientFactory;

        
        public UsersController(ApplicationDbContext context, IConfiguration configuration, IHttpClientFactory httpClientFactory)
        {
            _context = context;
            _configuration = configuration;
            _httpClientFactory = httpClientFactory;
        }

        // --- MODIFICATION 3: Update method to use DbContext ---
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var users = await _context.Users
                .Select(u => u.ToUserDto())
                .ToListAsync();
            
            return Ok(users);
        }

     
        [HttpPost]
        public async Task<IActionResult> Create([FromForm] CreateUserRequestDto userDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userModel = userDto.ToUserFromCreateDto();
            
            
            await _context.Users.AddAsync(userModel);
            await _context.SaveChangesAsync();
            
            var createdUserDto = userModel.ToUserDto();

            return CreatedAtAction(nameof(GetAll), new { id = createdUserDto.UserId }, createdUserDto);
        }

        [Authorize]
        [HttpPost("me/public-metadata")]
        public async Task<IActionResult> SetPublicMetadata([FromBody] SetPublicMetadataRequest request)
        {
            var roleName = request.Role?.Trim().ToLowerInvariant();
            if (roleName is not ("client" or "owner"))
            {
                return BadRequest("Role must be either client or owner.");
            }

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? User.FindFirstValue("sub");
            if (string.IsNullOrWhiteSpace(userId))
            {
                return Unauthorized();
            }

            var username = string.IsNullOrWhiteSpace(request.Username) ? request.Email?.Split('@')[0] : request.Username.Trim();
            if (string.IsNullOrWhiteSpace(username) || string.IsNullOrWhiteSpace(request.Email))
            {
                return BadRequest("Username and email are required.");
            }

            var user = await _context.Users
                .Include(u => u.UserRoles)
                .ThenInclude(ur => ur.Role)
                .FirstOrDefaultAsync(u => u.UserId == userId);

            if (user is not null)
            {
                var existingRole = user.UserRoles.FirstOrDefault()?.Role.RoleName;
                if (!string.IsNullOrWhiteSpace(existingRole) && existingRole != roleName)
                {
                    return Forbid();
                }

                user.Username = username;
                user.Email = request.Email;
            }
            else
            {
                user = new User { UserId = userId, Username = username, Email = request.Email };
                _context.Users.Add(user);
            }

            var role = await _context.Roles.FirstAsync(r => r.RoleName == roleName);
            if (!user.UserRoles.Any(ur => ur.RoleId == role.RoleId))
            {
                _context.UserRoles.RemoveRange(user.UserRoles);
                user.UserRoles.Add(new UserRole { UserId = userId, RoleId = role.RoleId });
            }

            await SetClerkPublicRole(userId, roleName);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private async Task SetClerkPublicRole(string userId, string role)
        {
            var secretKey = _configuration["Clerk:SecretKey"];
            if (string.IsNullOrWhiteSpace(secretKey))
            {
                throw new InvalidOperationException("Clerk:SecretKey must be configured to update public metadata.");
            }

            using var request = new HttpRequestMessage(HttpMethod.Patch, $"https://api.clerk.com/v1/users/{userId}/metadata")
            {
                Content = JsonContent.Create(new { public_metadata = new { role } })
            };
            request.Headers.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", secretKey);
            var response = await _httpClientFactory.CreateClient().SendAsync(request);
            response.EnsureSuccessStatusCode();
        }
    }

    public class SetPublicMetadataRequest
    {
        public string? Role { get; set; }
        public string? Username { get; set; }
        public string? Email { get; set; }
    }
}
