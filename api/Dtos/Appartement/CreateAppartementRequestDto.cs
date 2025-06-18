using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.Dtos.Appartement
{
    public class CreateAppartementRequestDto
    {
        [Required]
        public string Name { get; set; } = string.Empty;
        [Required]
        public string Description { get; set; } = string.Empty;
        [Required]
        public decimal BasePricePerNight { get; set; }
        [Required]
        public int Capacity { get; set; }
        public string? Rules { get; set; }
        public IFormFileCollection Photos { get; set; } = new FormFileCollection();

        [Required]
        public Address Address { get; set; } = new Address(); // Using the Model directly

        [Required]
        public int NumberOfBedrooms { get; set; }
        [Required]
        public int NumberOfBathrooms { get; set; }
        public int? FloorNumber { get; set; }
        public List<Guid> AmenityIds { get; set; } = new List<Guid>();
        public Guid ProviderId { get; set; }
    }
}