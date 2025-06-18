using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Cottage;
using api.Models;

namespace api.Mappers
{
    public static class CottageMapper
    {
        public static CottageDto ToCottageDto(this Cottage cottage)
        {
            return new CottageDto
            {
                Id = cottage.Id,
                Name = cottage.Name,
                Description = cottage.Description,
                Photos = cottage.Photos,
                BasePricePerNight = cottage.BasePricePerNight,
                Capacity = cottage.Capacity,
                Rules = cottage.Rules,
                AverageRating = cottage.AverageRating, 
                Amenities = cottage.Amenities?.Select(a => a.ToAmenityDto()).ToList() ?? new List<Dtos.Amenity.AmenityDto>(),
                
                Address = cottage.Address,
                Status = cottage.Status,
                ProviderId = cottage.ProviderId,
                ProviderName = cottage.Provider?.Username ?? "", 
                
             
                NumberOfBedrooms = cottage.NumberOfBedrooms,
                NumberOfBathrooms = cottage.NumberOfBathrooms,
                IsDetached = cottage.IsDetached,
                HasFireplace = cottage.HasFireplace
            };
        }

        // Maps the CreateCottageRequestDto to a new Cottage entity
        public static Cottage ToCottageFromCreateDto(this CreateCottageRequestDto cottageDto, List<string> imageUrls)
        {
            return new Cottage
            {
               
                Name = cottageDto.Name,
                Description = cottageDto.Description,
                Photos = imageUrls,
                BasePricePerNight = cottageDto.BasePricePerNight,
                Capacity = cottageDto.Capacity,
                Rules = cottageDto.Rules,

                
                Address = cottageDto.Address,
                ProviderId = cottageDto.ProviderId,
                Status = AccommodationStatus.PENDING_APPROVAL, 

                
                NumberOfBedrooms = cottageDto.NumberOfBedrooms,
                NumberOfBathrooms = cottageDto.NumberOfBathrooms,
                IsDetached = cottageDto.IsDetached,
                HasFireplace = cottageDto.HasFireplace
            };
        }
    }
}