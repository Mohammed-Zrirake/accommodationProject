using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Amenity;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [Route("api/amenities")]
    [ApiController]
    public class AmenitiesController : ControllerBase
    {
        private readonly ApplicationDbContext context;

        public AmenitiesController(ApplicationDbContext _context)
        {
            context = _context;
        }

        // --- MODIFICATION 3: Update method to use DbContext ---
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var amenities = await context.Amenities
                .Select(a => a.ToAmenityDto())
                .ToListAsync();
            if (amenities == null)
            {
                return NotFound();
                }
            return Ok(amenities);
        }

        // --- MODIFICATION 4: Update method to use DbContext ---
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateAmenityRequestDto amenityDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var amenityModel = amenityDto.ToAmenityFromCreateDto();

            
            await context.Amenities.AddAsync(amenityModel);
            
            await context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAll), new { id = amenityModel.AmenityId }, amenityModel.ToAmenityDto());
        }
        
    }
}