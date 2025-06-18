using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Room;
using api.Models;

namespace api.Mappers
{
    public static class RoomMapper
    {
      public static RoomDto ToRoomDto(this Room roomModel)
        {
            return new RoomDto
            {
                Id = roomModel.Id,
                Name = roomModel.Name,
                Description = roomModel.Description,
                Photos = roomModel.Photos,
                BasePricePerNight = roomModel.BasePricePerNight,
                Capacity = roomModel.Capacity,
                Rules = roomModel.Rules,
                AverageRating = roomModel.AverageRating,
                HotelId = roomModel.HotelId,
                RiadId = roomModel.RiadId,
                HostelId = roomModel.HostelId,
                Amenities = roomModel.Amenities.Select(a => a.ToAmenityDto()).ToList()
            };
        }

        // From Create DTO to Entity
        public static Room ToRoomFromCreateDto(this CreateRoomRequestDto dto, List<string> photoUrls)
        {
            return new Room
            {
                Name = dto.Name,
                Description = dto.Description,
                BasePricePerNight = dto.BasePricePerNight,
                Capacity = dto.Capacity,
                Rules = dto.Rules,
                Photos = photoUrls,
                HotelId = dto.HotelId,
                RiadId = dto.RiadId,
                HostelId = dto.HostelId
            };
        }
    
    }
}