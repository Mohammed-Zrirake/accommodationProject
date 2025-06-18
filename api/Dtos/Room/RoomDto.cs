using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Amenity;


namespace api.Dtos.Room
{
    public class RoomDto
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

        // Properties from Room (Foreign Keys to parent)
        public Guid? HotelId { get; set; }
        public Guid? RiadId { get; set; }
        public Guid? HostelId { get; set; }
    
    }
}