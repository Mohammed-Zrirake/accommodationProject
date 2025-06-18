using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.User;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        
        private readonly ApplicationDbContext _context;
        private readonly IPasswordHasher<User> _passwordHasher;

        
        public UsersController(ApplicationDbContext context, IPasswordHasher<User> passwordHasher)
        {
            _context = context;
            _passwordHasher = passwordHasher;
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
            
            userModel.PasswordHash = _passwordHasher.HashPassword(userModel, userDto.Password);
            
            await _context.Users.AddAsync(userModel);
            await _context.SaveChangesAsync();
            
            var createdUserDto = userModel.ToUserDto();

            return CreatedAtAction(nameof(GetAll), new { id = createdUserDto.UserId }, createdUserDto);
        }
    }
}