using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Room
{
    public class CreateRoomRequestDto
    {
        [Required]
        public string Name { get; set; } = string.Empty;
        [Required]
        public string Description { get; set; } = string.Empty;
        [Required]
        public IFormFileCollection Photos { get; set; } = new FormFileCollection();
        [Required]
        public decimal BasePricePerNight { get; set; }
        [Required]
        public int Capacity { get; set; }
        public string? Rules { get; set; }
        
        [Required]
        public List<Guid> AmenityIds { get; set; } = new List<Guid>();

        // Properties from Room (Foreign Keys to parent)
        public Guid? HotelId { get; set; }
        public Guid? RiadId { get; set; }
        public Guid? HostelId { get; set; }
    }
}