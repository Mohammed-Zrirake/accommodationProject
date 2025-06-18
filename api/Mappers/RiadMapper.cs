using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Riad;
using api.Dtos.Riad.api.Dtos.Riad;
using api.Models;

namespace api.Mappers
{
    public static class RiadMapper
    {
        // Converts a Riad entity to a RiadDto for API responses
        public static RiadDto ToRiadDto(this Riad riadModel)
        {
            return new RiadDto
            {
                Id = riadModel.Id,
                Name = riadModel.Name,
                Address = riadModel.Address,
                Description = riadModel.Description,
                Photos = riadModel.Photos,
                HasCourtyard = riadModel.HasCourtyard,
                TraditionalDecor = riadModel.TraditionalDecor,
                ProviderId = riadModel.ProviderId,
                
                ProviderName = riadModel.Provider?.Username ?? string.Empty, 
                
                Rooms = riadModel.Rooms.Select(r => r.ToRoomDto()).ToList()
            };
        }

        // Converts a CreateRiadRequestDto to a Riad entity for creation
        public static Riad ToRiadFromCreateDto(this CreateRiadRequestDto dto, List<string> photoUrls)
        {
            return new Riad
            {
                Name = dto.Name,
                Address = dto.Address,
                Description = dto.Description,
                HasCourtyard = dto.HasCourtyard,
                TraditionalDecor = dto.TraditionalDecor,
                ProviderId = dto.ProviderId,
                Photos = photoUrls, 
            };
        }
    }
}