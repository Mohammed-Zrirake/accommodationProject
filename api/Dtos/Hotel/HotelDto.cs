using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Amenity;
using api.Dtos.Room;
using api.Models;

namespace api.Dtos.Hotel
{
    
        public class HotelDto
    {
        public Guid HotelId { get; set; }
        [Required]
        [MaxLength(200)]
        public string Name { get; set; } = string.Empty;

        [Required]
        public Address Address { get; set; } = new Address();

        public List<string> Photos { get; set; } = new List<string>();
        public string Description { get; set; } = string.Empty;
        public int StarRating { get; set; }
        public  List<AmenityDto> HotelAmenities { get; set; } = new List<AmenityDto>();

        public  List<RoomDto> Rooms { get; set; } = new List<RoomDto>();

        public string ProviderName { get; set; }= string.Empty;
        
    }
    
}