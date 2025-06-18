using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Amenity;
using api.Models;

namespace api.Mappers
{
    public static class AmenityMapper
    {
        public static AmenityDto ToAmenityDto(this Amenity amenityModel)
        {
            return new AmenityDto
            {
                AmenityId = amenityModel.AmenityId,
                Name = amenityModel.Name,
                Category = amenityModel.Category
            };
        }

        public static Amenity ToAmenityFromCreateDto(this CreateAmenityRequestDto amenityDto)
        {
            return new Amenity
            {
                Name = amenityDto.Name,
                Category = amenityDto.Category
            };
        }
    }
}