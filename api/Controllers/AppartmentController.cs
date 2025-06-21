using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Appartement;
using api.IServices;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [ApiController]
    [Route("api/appartment")]
    public class AppartmentController : ControllerBase
    {
     private readonly ApplicationDbContext context;
        private readonly IFileStorageService fileStorage;
        public AppartmentController(ApplicationDbContext _context, IFileStorageService _fileStorage)
        {
            context = _context;
            fileStorage = _fileStorage;
        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var appartement = await context.Appartements.Include(v => v.Amenities).Include(v => v.Provider).ToListAsync();
            var appartements = appartement.Select(v => v.ToAppartementDto());
            if (appartements == null)
            {
                return NotFound();
            }
            return Ok(appartements);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var appartement = await context.Appartements
        .Include(v => v.Amenities).Include(v => v.Provider)
        .FirstOrDefaultAsync(v => v.Id == id);
            if (appartement == null)
            {
                return NotFound();
            }
            return Ok(appartement.ToAppartementDto());
        }

        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var appartement = await context.Appartements.FirstOrDefaultAsync(a => a.Id == id);

            if (appartement == null)
            {
                return NotFound($"Apartment with ID {id} not found.");
            }

            try
            {
                // 1. Delete associated photos from the file system
                if (appartement.Photos != null && appartement.Photos.Any())
                {
                    // Assuming photos are in the root 'images' folder, no subfolder needed
                    await fileStorage.DeleteAllFilesAsync(appartement.Photos);
                }

                // 2. Remove the entity from the database
                context.Appartements.Remove(appartement);
                await context.SaveChangesAsync();

                // 3. Return 204 No Content for a successful deletion
                return NoContent();
            }
            catch (Exception e)
            {
                // Log the exception (optional) and return a server error
                return StatusCode(500, new { error = "An error occurred while deleting the apartment.", details = e.Message });
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateAppartement([FromForm] CreateAppartementRequestDto appartementDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var appartement = appartementDto.ToAppartementFromCreateDto(new List<string>());
            appartement.ProviderId = new Guid("B4FE4FA2-8F1C-42A4-8FCE-6ED3B40EFE37");

            try
            {
                if (appartementDto.Photos != null && appartementDto.Photos.Count > 0)
                {
                    List<string> fileNames = await fileStorage.SaveAllFilesAsync(appartementDto.Photos);
                    appartement.Photos = fileNames;
                }
                appartement.Amenities = new List<Amenity>(); // Initialize the collection
        if (appartementDto.AmenityIds != null && appartementDto.AmenityIds.Any())
        {
            foreach (var amenityId in appartementDto.AmenityIds)
            {
                // Find the real amenity in the database
                var existingAmenity = await context.Amenities.FindAsync(amenityId);
                if (existingAmenity != null)
                {
                    // Add the TRACKED entity from the database to the villa
                    appartement.Amenities.Add(existingAmenity);
                }
                else
                {
                    // An amenity ID was provided that doesn't exist. Handle this error.
                    return BadRequest($"Amenity with ID {amenityId} was not found.");
                }
            }
        }
            await context.Appartements.AddAsync(appartement);
            await context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById),new {id=appartement.Id},appartement.ToAppartementDto());
            }
            catch (Exception e)
            {
                return StatusCode(500, new { error = "An internal server error occurred while saving the villa.", details = e.Message });
            }
            
            
        }
    }
}