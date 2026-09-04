using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using api.Dtos.Auth;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace api.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _configuration;

        public AuthController(
            UserManager<User> userManager,
            RoleManager<IdentityRole> roleManager,
            IConfiguration configuration)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _configuration = configuration;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequestDto request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var existingUser = await _userManager.FindByEmailAsync(request.Email);
            if (existingUser != null)
            {
                return BadRequest(new { message = "A user with this email address already exists." });
            }

            var requestedRole = request.Role?.Trim().ToLowerInvariant();
            if (requestedRole != "client" && requestedRole != "owner")
            {
                requestedRole = "client";
            }

            var user = new User
            {
                UserName = string.IsNullOrWhiteSpace(request.Username) ? request.Email.Split('@')[0] : request.Username.Trim(),
                Email = request.Email.Trim(),
                RegistrationDate = DateTime.UtcNow
            };

            var createResult = await _userManager.CreateAsync(user, request.Password);
            if (!createResult.Succeeded)
            {
                return BadRequest(new { 
                    message = "User registration failed.", 
                    errors = createResult.Errors.Select(e => e.Description) 
                });
            }

            // Ensure the role exists
            if (!await _roleManager.RoleExistsAsync(requestedRole))
            {
                await _roleManager.CreateAsync(new IdentityRole(requestedRole));
            }

            await _userManager.AddToRoleAsync(user, requestedRole);

            var roles = await _userManager.GetRolesAsync(user);
            var (token, expiresAt) = GenerateJwtToken(user, roles);

            return Ok(new AuthResponseDto
            {
                Token = token,
                UserId = user.Id,
                Email = user.Email!,
                Username = user.UserName!,
                Roles = roles,
                ExpiresAt = expiresAt
            });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestDto request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _userManager.FindByEmailAsync(request.Email);
            if (user == null)
            {
                return Unauthorized(new { message = "Invalid email or password." });
            }

            var isValidPassword = await _userManager.CheckPasswordAsync(user, request.Password);
            if (!isValidPassword)
            {
                return Unauthorized(new { message = "Invalid email or password." });
            }

            var roles = await _userManager.GetRolesAsync(user);
            var (token, expiresAt) = GenerateJwtToken(user, roles);

            return Ok(new AuthResponseDto
            {
                Token = token,
                UserId = user.Id,
                Email = user.Email!,
                Username = user.UserName!,
                Roles = roles,
                ExpiresAt = expiresAt
            });
        }

        [Authorize]
        [HttpGet("me")]
        public async Task<IActionResult> GetCurrentUser()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier) 
                      ?? User.FindFirstValue("sub");

            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized();
            }

            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return NotFound("User not found.");
            }

            var roles = await _userManager.GetRolesAsync(user);

            return Ok(new UserProfileDto
            {
                UserId = user.Id,
                Email = user.Email ?? string.Empty,
                Username = user.UserName ?? string.Empty,
                Roles = roles,
                RegistrationDate = user.RegistrationDate
            });
        }

        private (string Token, DateTime ExpiresAt) GenerateJwtToken(User user, IList<string> roles)
        {
            var jwtKey = _configuration["Jwt:Key"] 
                ?? "AccommodationSuperSecretKeyForJwtAuthenticationProject2026SecureKey!";
            var jwtIssuer = _configuration["Jwt:Issuer"] ?? "AccommodationApi";
            var jwtAudience = _configuration["Jwt:Audience"] ?? "AccommodationClient";
            var expiryDays = int.TryParse(_configuration["Jwt:ExpiryInDays"], out var d) ? d : 30;

            var expiresAt = DateTime.UtcNow.AddDays(expiryDays);

            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id),
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(JwtRegisteredClaimNames.Email, user.Email ?? ""),
                new Claim(ClaimTypes.Email, user.Email ?? ""),
                new Claim(JwtRegisteredClaimNames.Name, user.UserName ?? ""),
                new Claim(ClaimTypes.Name, user.UserName ?? ""),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
                claims.Add(new Claim("role", role));
            }

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var tokenDescriptor = new JwtSecurityToken(
                issuer: jwtIssuer,
                audience: jwtAudience,
                claims: claims,
                expires: expiresAt,
                signingCredentials: credentials
            );

            var tokenHandler = new JwtSecurityTokenHandler();
            return (tokenHandler.WriteToken(tokenDescriptor), expiresAt);
        }
    }
}
