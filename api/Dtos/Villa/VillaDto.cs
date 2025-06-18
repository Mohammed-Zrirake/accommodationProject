using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Amenity;
using api.Models;

namespace api.Dtos.Villa
{
    public class VillaDto
    {
        public Guid Id { get; set; }
       public string Name { get; set; } = string.Empty; 
        public string Description { get; set; } = string.Empty;

        public List<string> Photos { get; set; } = new List<string>();

        
        public decimal BasePricePerNight { get; set; }

        public int Capacity { get; set; } // Max number of guests

        public string? Rules { get; set; }

        // CHANGE: Using a many-to-many relationship for amenities
        public List<AmenityDto> Amenities { get; set; } = new List<AmenityDto>();
        public Address Address { get; set; } = new Address();
        public Guid ProviderId { get; set; }
        public int NumberOfBedrooms { get; set; }
        public int NumberOfBathrooms { get; set; } 
    }
}