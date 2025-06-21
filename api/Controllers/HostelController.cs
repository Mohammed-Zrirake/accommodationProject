using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Hostel;
using api.IServices;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using api.Mappers;
using api.Models;

namespace api.Controllers
{
    [ApiController]
    [Route("api/hostel")]
    public class HostelController : ControllerBase
    {
      private readonly ApplicationDbContext context;
        private readonly IFileStorageService fileStorage;
        
        public HostelController(ApplicationDbContext _context, IFileStorageService _fileStorage)
        {
            context = _context;
            fileStorage = _fileStorage;
           
        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var hostels = await context.Hostels.Include(h => h.PrivateRooms).Include(h => h.Dorms).Include(h => h.Provider).ToListAsync();
            if (hostels == null)
            {
                return NotFound();
            }
            return Ok(hostels);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {
            var hostel = await context.Hostels.Include(h => h.PrivateRooms).Include(h => h.Dorms).Include(h => h.Provider).FirstOrDefaultAsync(h=>h.HostelId==id);
            if (hostel == null)
            {
                return NotFound();
            }
            return Ok(hostel);
        }
        [HttpPost]
        public async Task<IActionResult> CreateHostel([FromForm] CreateHostelRequestDto hostelDto)
        {
            try
            {
                var images = await fileStorage.SaveAllFilesAsync(hostelDto.Photos);
                var hostel = hostelDto.ToHostelFromCreateDto(images);

                hostel.PrivateRooms = new List<Room>(); // Leave rooms empty on creation

                await context.Hostels.AddAsync(hostel);
                await context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetById), new { id = hostel.HostelId }, hostel.ToHostelDto());
            }
            catch (Exception e)
            {
                return StatusCode(500, new { error = "An error occurred while creating the hotel", details = e.Message });
            }
            
        }  
    }
}