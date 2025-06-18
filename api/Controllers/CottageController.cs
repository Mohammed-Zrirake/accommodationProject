using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Cottage;
using api.IServices;
using api.Mappers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [Route("api/cottage")]
    [ApiController]
    public class CottageController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IFileStorageService _fileStorage;

        public CottageController(ApplicationDbContext context, IFileStorageService fileStorage)
        
        {
            _context = context;
            _fileStorage = fileStorage;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var cottages = await _context.Cottages
                .Include(c => c.Provider)   // Include Provider to get the name
                .Include(c => c.Amenities)  // Include Amenities for the DTO
                .Select(c => c.ToCottageDto()) // Project to DTO for efficiency
                .AsNoTracking()
                .ToListAsync();
            
            return Ok(cottages);
        }

        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {
            var cottage = await _context.Cottages
                .Include(c => c.Provider)
                .Include(c => c.Amenities)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (cottage == null)
            {
                return NotFound();
            }

            return Ok(cottage.ToCottageDto());
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromForm] CreateCottageRequestDto cottageDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
               
                var imageUrls = await _fileStorage.SaveAllFilesAsync(cottageDto.Photos, "cottages");

                var cottage = cottageDto.ToCottageFromCreateDto(imageUrls);

                await _context.Cottages.AddAsync(cottage);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetById), new { id = cottage.Id }, cottage.ToCottageDto());
            }
            catch (Exception e)
            {
                return StatusCode(500, new { error = "An error occurred while creating the cottage.", details = e.Message });
            }
        }

    }
}