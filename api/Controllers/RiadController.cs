using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Riad.api.Dtos.Riad;
using api.IServices;
using api.Mappers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [Route("api/riad")]
    [ApiController]
    public class RiadController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IFileStorageService _fileStorage;

        public RiadController(ApplicationDbContext context, IFileStorageService fileStorage)
        {
            _context = context;
            _fileStorage = fileStorage;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            
            var riads = await _context.Riads
                .Include(r => r.Rooms)
                .Include(r => r.Provider)
                .Include(r => r.Amenities)
                .Select(r => r.ToRiadDto()) 
                .AsNoTracking()
                .ToListAsync();
            
            return Ok(riads);
        }

        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {
            var riad = await _context.Riads
                .Include(r => r.Rooms)
                .Include(r => r.Provider)
                .FirstOrDefaultAsync(r => r.Id == id);

            if (riad == null)
            {
                return NotFound();
            }

            
            return Ok(riad.ToRiadDto());
        }

        [HttpPost]
        public async Task<IActionResult> CreateRiad([FromForm] CreateRiadRequestDto riadDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            try
            {
                var imageUrls = await _fileStorage.SaveAllFilesAsync(riadDto.Photos, "riads");

                var riad = riadDto.ToRiadFromCreateDto(imageUrls);

                await _context.Riads.AddAsync(riad);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetById), new { id = riad.Id }, riad.ToRiadDto());
            }
            catch (Exception e)
            {
                return StatusCode(500, new { error = "An error occurred while creating the riad", details = e.Message });
            }
        }
    }
}