using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Hostel;
using api.Models;

namespace api.Mappers
{
    public static class HostelMapper
    {
        public static HostelDto ToHostelDto(this Hostel hostelModel)
        {
            return new HostelDto
            {
                HostelId = hostelModel.HostelId,
                Name = hostelModel.Name,
                Address = hostelModel.Address,
                Photos = hostelModel.Photos,
                Description = hostelModel.Description,
                StarRating = hostelModel.StarRating,
                
                ProviderName = hostelModel.Provider?.ToUserDto().Username ?? string.Empty,
                HostelAmenities = hostelModel.HostelAmenities.Select(a => a.ToAmenityDto()).ToList(),
                PrivateRooms = hostelModel.PrivateRooms.Select(r => r.ToRoomDto()).ToList()
            };
        }

        // From Create DTO to Entity
        public static Hostel ToHostelFromCreateDto(this CreateHostelRequestDto dto, List<string> photoUrls)
        {
            return new Hostel
            {
                Name = dto.Name,
                Address = dto.Address,
                Photos = photoUrls,
                Description = dto.Description,
                StarRating = dto.StarRating,
                ProviderId = dto.ProviderId
            };
        }
    
    }
}