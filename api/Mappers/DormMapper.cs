using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Dorm;
using api.Models;

namespace api.Mappers
{
    public static class DormMapper
    {
        public static DormDto ToDormDto(this Dorm dormModel)
        {
            return new DormDto
            {
                Id = dormModel.Id,
                Name = dormModel.Name,
                Description = dormModel.Description,
                Photos = dormModel.Photos,
                BasePricePerNight = dormModel.BasePricePerNight,
                Capacity = dormModel.Capacity,
                Rules = dormModel.Rules,
                AverageRating = dormModel.AverageRating,
                HostelId = dormModel.HostelId,
                // Safely get the Hostel name if the navigation property is loaded
                HostelName = dormModel.Hostel?.Name ?? string.Empty, 
                Amenities = dormModel.Amenities.Select(a => a.ToAmenityDto()).ToList()
            };
        }

        // From Create DTO to Entity
        public static Dorm ToDormFromCreateDto(this CreateDormRequestDto dto, List<string> photoUrls)
        {
            return new Dorm
            {
                Name = dto.Name,
                Description = dto.Description,
                BasePricePerNight = dto.BasePricePerNight,
                Capacity = dto.Capacity,
                Rules = dto.Rules,
                HostelId = dto.HostelId,
                Photos = photoUrls, // The service provides the saved URLs
                // Amenities are handled by the service layer
            };
        }
    
        
    }
}