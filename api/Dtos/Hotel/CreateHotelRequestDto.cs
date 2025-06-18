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
    public class CreateHotelRequestDto
    {
        [Required]
        [MaxLength(200)]
        public string Name { get; set; } = string.Empty;

        [Required]
        public Address Address { get; set; } = new Address();

        public IFormFileCollection Photos { get; set; } = new FormFileCollection();
        public string Description { get; set; } = string.Empty;
        public int StarRating { get; set; }
        public  List<Guid> HotelAmenitiesIds { get; set; } = new List<Guid>();

        

        public Guid ProviderId { get; set; }
        
    }
}