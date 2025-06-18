using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Quic;
using System.Threading.Tasks;
using api.Dtos;
using api.Dtos.Villa;
using api.Models;

namespace api.Mappers
{
    public static class VillaMappers
    {
        public static VillaDto ToVillaDto(this Villa villa)
        {
            return new VillaDto
            {
                Id = villa.Id,
                Name = villa.Name,
                Description = villa.Description,
                Photos = villa.Photos,
                BasePricePerNight = villa.BasePricePerNight,
                Capacity = villa.Capacity,
                Amenities = villa.Amenities.Select(a=>a.ToAmenityDto()).ToList(),
                Address = villa.Address,
                ProviderId = villa.ProviderId,
                NumberOfBedrooms = villa.NumberOfBedrooms,
                NumberOfBathrooms = villa.NumberOfBathrooms
            };
        }
        public static Villa ToVillaRequestDto(this CreateVillaRequestDto villaDto)
        {
            return new Villa
            {
                
                Name = villaDto.Name,
                Description = villaDto.Description,
                BasePricePerNight = villaDto.BasePricePerNight,
                Capacity = villaDto.Capacity,
                Rules = villaDto.Rules,
                Address = villaDto.Address,
                ProviderId = villaDto.ProviderId,
                NumberOfBedrooms = villaDto.NumberOfBedrooms,
                NumberOfBathrooms=villaDto.NumberOfBathrooms
                
            };
        }
    }
}