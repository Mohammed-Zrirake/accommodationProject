using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Amenity;

namespace api.Dtos.Dorm
{
    public class DormDto
    {
        // Properties from BookableUnit
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public List<string> Photos { get; set; } = new List<string>();
        public decimal BasePricePerNight { get; set; }
        public int Capacity { get; set; } // Represents number of beds
        public string? Rules { get; set; }
        public double AverageRating { get; set; }
        public ICollection<AmenityDto> Amenities { get; set; } = new List<AmenityDto>();

        // Properties from Dorm
        public Guid HostelId { get; set; }
        public string HostelName { get; set; } = string.Empty; // Added for convenience
    }
}