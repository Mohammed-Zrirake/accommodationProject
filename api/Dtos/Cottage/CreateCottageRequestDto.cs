using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.Dtos.Cottage
{
    public class CreateCottageRequestDto
    {
        [Required]
        [MaxLength(200)]
        public string Name { get; set; } = string.Empty;

        [Required]
        public string Description { get; set; } = string.Empty;

        [Required]
        [Range(1, 100000)]
        public decimal BasePricePerNight { get; set; }

        [Required]
        [Range(1, 100)]
        public int Capacity { get; set; }

        public string? Rules { get; set; }

        // We receive photos as file uploads
        public IFormFileCollection Photos { get; set; } = new FormFileCollection();

        // Properties from Accommodation
        [Required]
        public Address Address { get; set; } = new Address();

        [Required]
        public Guid ProviderId { get; set; }

        // Properties from Cottage
        [Required]
        [Range(0, 20)]
        public int NumberOfBedrooms { get; set; }

        [Required]
        [Range(0, 20)]
        public int NumberOfBathrooms { get; set; }

        public bool IsDetached { get; set; }
        public bool HasFireplace { get; set; }
    }
    
}