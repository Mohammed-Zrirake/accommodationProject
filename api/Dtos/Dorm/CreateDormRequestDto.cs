using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Dorm
{
    
    public class CreateDormRequestDto
    {
        // Properties from BookableUnit
        [Required]
        [MaxLength(200)]
        public string Name { get; set; } = string.Empty;

        [Required]
        public string Description { get; set; } = string.Empty;

        [Required]
        [Range(0.01, double.MaxValue, ErrorMessage = "Price must be greater than zero.")]
        public decimal BasePricePerNight { get; set; } // Price per bed

        [Required]
        [Range(1, 100, ErrorMessage = "Capacity must be between 1 and 100 beds.")]
        public int Capacity { get; set; } // Number of beds

        public string? Rules { get; set; }
        
        public IFormFileCollection Photos { get; set; } = new FormFileCollection();

        // Properties from Dorm
        [Required]
        public Guid HostelId { get; set; }

        // To link amenities on creation
        public List<Guid> AmenityIds { get; set; } = new List<Guid>();
    }
}