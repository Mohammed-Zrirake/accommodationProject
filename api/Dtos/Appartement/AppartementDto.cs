using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Amenity;
using api.Models;

namespace api.Dtos.Appartement
{
    public class AppartementDto
    {
        // Properties from BookableUnit
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public List<string> Photos { get; set; } = new List<string>();
        public decimal BasePricePerNight { get; set; }
        public int Capacity { get; set; }
        public string? Rules { get; set; }
        public double AverageRating { get; set; }
        public ICollection<AmenityDto> Amenities { get; set; } = new List<AmenityDto>();

        // Properties from Accommodation
        public Address Address { get; set; } = new Address();
        public AccommodationStatus Status { get; set; }
        public Guid ProviderId { get; set; }
        public string ProviderName { get; set; } = string.Empty; // Flattened for convenience

        // Properties from Appartement
        public int NumberOfBedrooms { get; set; }
        public int NumberOfBathrooms { get; set; }
        public int? FloorNumber { get; set; }
    }
}