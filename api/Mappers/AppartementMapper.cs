using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Appartement;
using api.Models;

namespace api.Mappers
{
    public static class AppartementMapper
    {
        
        public static AppartementDto ToAppartementDto(this Appartement appartementModel)
        {
            return new AppartementDto
            {
                Id=appartementModel.Id,
                Name = appartementModel.Name,
                Description = appartementModel.Description,
                Photos = appartementModel.Photos,
                BasePricePerNight = appartementModel.BasePricePerNight,
                Capacity = appartementModel.Capacity,
                Rules = appartementModel.Rules,
                AverageRating = appartementModel.AverageRating,
                Address = appartementModel.Address,
                Status = appartementModel.Status,
                ProviderId = appartementModel.ProviderId,
                ProviderName = appartementModel.Provider?.ToUserDto().Username ?? string.Empty, 
                NumberOfBedrooms = appartementModel.NumberOfBedrooms,
                NumberOfBathrooms = appartementModel.NumberOfBathrooms,
                FloorNumber = appartementModel.FloorNumber,
                Amenities = appartementModel.Amenities.Select(a => a.ToAmenityDto()).ToList()
            };
        }

        // From Create DTO to Entity (for POST requests)
        public static Appartement ToAppartementFromCreateDto(this CreateAppartementRequestDto dto, List<string> photoUrls)
        {
            return new Appartement
            {
                
                Name = dto.Name,
                Description = dto.Description,
                BasePricePerNight = dto.BasePricePerNight,
                Capacity = dto.Capacity,
                Rules = dto.Rules,
                Photos = photoUrls,
                Address = dto.Address, 
                ProviderId = dto.ProviderId,
                Status = AccommodationStatus.AVAILABLE,
                NumberOfBedrooms = dto.NumberOfBedrooms,
                NumberOfBathrooms = dto.NumberOfBathrooms,
                FloorNumber = dto.FloorNumber
            };
        }
    }
}