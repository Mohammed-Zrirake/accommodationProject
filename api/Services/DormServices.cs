using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Dorm;
using api.IServices;
using api.Mappers;
using Microsoft.EntityFrameworkCore;

namespace api.Services
{
    public class DormServices: IDormServices
    {
        private readonly ApplicationDbContext _context;
        private readonly IFileStorageService _fileStorage;
        private readonly ILogger<DormServices> _logger;

        public DormServices(ApplicationDbContext context, IFileStorageService fileStorage, ILogger<DormServices> logger)
        {
            _context = context;
            _fileStorage = fileStorage;
            _logger = logger;
        }

        public async Task<DormDto> CreateDormAsync(CreateDormRequestDto dormDto)
        {
            // First, validate that the parent Hostel exists.
            var hostelExists = await _context.Hostels.AnyAsync(h => h.HostelId == dormDto.HostelId);
            if (!hostelExists)
            {
                throw new ArgumentException($"Hostel with ID {dormDto.HostelId} was not found.");
            }

            try
            {
                var photoUrls = await _fileStorage.SaveAllFilesAsync(dormDto.Photos, "dorms");
                var dorm = dormDto.ToDormFromCreateDto(photoUrls);

                if (dormDto.AmenityIds != null && dormDto.AmenityIds.Any())
                {
                    var amenities = await _context.Amenities
                        .Where(a => dormDto.AmenityIds.Contains(a.AmenityId))
                        .ToListAsync();

                    if (amenities.Count != dormDto.AmenityIds.Distinct().Count())
                    {
                        var foundIds = amenities.Select(a => a.AmenityId);
                        var notFoundIds = dormDto.AmenityIds.Except(foundIds);
                        throw new ArgumentException($"The following amenities were not found: {string.Join(", ", notFoundIds)}");
                    }
                    dorm.Amenities = amenities;
                }

                await _context.Dorms.AddAsync(dorm);
                await _context.SaveChangesAsync();

                // It's crucial to map the saved entity back to a DTO to include the generated ID.
                return dorm.ToDormDto();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while creating a dorm.");
                throw; 
            }
        }

        public async Task<List<DormDto>> GetAllAsync()
        {
            var dorms = await _context.Dorms
                .Include(d => d.Amenities)
                .Include(d => d.Hostel) 
                .AsNoTracking()
                .ToListAsync();

            return dorms.Select(d => d.ToDormDto()).ToList();
        }

        public async Task<DormDto?> GetByIdAsync(Guid id)
        {
            var dorm = await _context.Dorms
                .Include(d => d.Amenities)
                .Include(d => d.Hostel)
                .AsNoTracking()
                .FirstOrDefaultAsync(d => d.Id == id);

            return dorm?.ToDormDto(); 
        }
    }
}