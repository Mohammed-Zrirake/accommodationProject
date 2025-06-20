using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Villa;
using api.IServices;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [ApiController]
    [Route("api/villa")]
    public class VillaController : ControllerBase
    {
        private readonly ApplicationDbContext context;
        private readonly IFileStorageService fileStorage;
        public VillaController(ApplicationDbContext _context, IFileStorageService _fileStorage)
        {
            context = _context;
            fileStorage = _fileStorage;
        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var villa = await context.Villas.Include(v => v.Amenities).ToListAsync();
            var villas = villa.Select(v => v.ToVillaDto());
            if (villas == null)
            {
                return NotFound();
            }
            return Ok(villas);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var villa = await context.Villas
        .Include(v => v.Amenities)
        .FirstOrDefaultAsync(v => v.Id == id);
            if (villa == null)
            {
                return NotFound();
            }
            return Ok(villa.ToVillaDto());
        }
        [HttpPost]
        public async Task<IActionResult> CreateVilla([FromForm] CreateVillaRequestDto villaDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var villa = villaDto.ToVillaRequestDto();

            try
            {
                if (villaDto.Photos != null && villaDto.Photos.Count > 0)
                {
                    List<string> fileNames = await fileStorage.SaveAllFilesAsync(villaDto.Photos);
                    villa.Photos = fileNames;
                }
                villa.Amenities = new List<Amenity>(); // Initialize the collection
                if (villaDto.AmenityIds != null && villaDto.AmenityIds.Any())
                {
                    foreach (var amenityId in villaDto.AmenityIds)
                    {
                        // Find the real amenity in the database
                        var existingAmenity = await context.Amenities.FindAsync(amenityId);
                        if (existingAmenity != null)
                        {
                            // Add the TRACKED entity from the database to the villa
                            villa.Amenities.Add(existingAmenity);
                        }
                        else
                        {
                            // An amenity ID was provided that doesn't exist. Handle this error.
                            return BadRequest($"Amenity with ID {amenityId} was not found.");
                        }
                    }
                }
                await context.Villas.AddAsync(villa);
                await context.SaveChangesAsync();
                return CreatedAtAction(nameof(GetById), new { id = villa.Id }, villa.ToVillaDto());
            }
            catch (Exception e)
            {
                return StatusCode(500, new { error = "An internal server error occurred while saving the villa.", details = e.Message });

            }


        }
      
        
        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var villa = await context.Villas.FirstOrDefaultAsync(v => v.Id == id);

            if (villa == null)
            {
                return NotFound($"Villa with ID {id} not found.");
            }

            try
            {
                // 1. Delete associated photos
                if (villa.Photos != null && villa.Photos.Any())
                {
                    await fileStorage.DeleteAllFilesAsync(villa.Photos);
                }

                // 2. Remove the entity from the database
                context.Villas.Remove(villa);
                await context.SaveChangesAsync();

                // 3. Return 204 No Content
                return NoContent();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return StatusCode(500, new { error = "An error occurred while deleting the villa.", details = e.Message });
            }
        }
    }
}