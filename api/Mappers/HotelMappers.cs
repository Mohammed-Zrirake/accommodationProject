using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Hotel;
using api.Models;

namespace api.Mappers
{
    public static class HotelMappers
    {
        public static HotelDto ToHotelDto(this Hotel hotelModel)
        {
            return new HotelDto
            {
                HotelId = hotelModel.HotelId,
                Name = hotelModel.Name,
                Address = hotelModel.Address,
                Photos = hotelModel.Photos,
                Description = hotelModel.Description,
                StarRating = hotelModel.StarRating,
                
                ProviderName = hotelModel.Provider?.ToUserDto().Username ?? string.Empty,
                HotelAmenities = hotelModel.HotelAmenities.Select(a => a.ToAmenityDto()).ToList(),
                Rooms = hotelModel.Rooms.Select(r => r.ToRoomDto()).ToList()
            };
        }

        // From Create DTO to Entity
        public static Hotel ToHotelFromCreateDto(this CreateHotelRequestDto dto, List<string> photoUrls)
        {
            return new Hotel
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