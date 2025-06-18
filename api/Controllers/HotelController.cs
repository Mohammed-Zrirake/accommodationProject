using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Hotel;
using api.IServices;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [Route("api/hotel")]
    [ApiController]
    public class HotelController : ControllerBase
    {
        private readonly ApplicationDbContext context;
        private readonly IFileStorageService fileStorage;
        
        public HotelController(ApplicationDbContext _context, IFileStorageService _fileStorage)
        {
            context = _context;
            fileStorage = _fileStorage;
           
        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var hotels = await context.Hotels.Include(h => h.Rooms).ToListAsync();
            if (hotels == null)
            {
                return NotFound();
            }
            return Ok(hotels);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {
            var hotel = await context.Hotels.Include(h => h.Rooms).FirstOrDefaultAsync(h=>h.HotelId==id);
            if (hotel == null)
            {
                return NotFound();
            }
            return Ok(hotel);
        }
        [HttpPost]
        public async Task<IActionResult> CreateHotel([FromForm] CreateHotelRequestDto hotelDto)
        {
            try
            {
                var images = await fileStorage.SaveAllFilesAsync(hotelDto.Photos);
                var hotel = hotelDto.ToHotelFromCreateDto(images);

                hotel.Rooms = new List<Room>(); // Leave rooms empty on creation

                await context.Hotels.AddAsync(hotel);
                await context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetById), new { id = hotel.HotelId }, hotel.ToHotelDto());
            }
            catch (Exception e)
            {
                return StatusCode(500, new { error = "An error occurred while creating the hotel", details = e.Message });
            }
            
        }
         
    }
    
}