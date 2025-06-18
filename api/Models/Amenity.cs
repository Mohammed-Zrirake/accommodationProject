using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
    public class Amenity
    {
        [Key]
        public Guid AmenityId { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; } = string.Empty; // e.g., "Wi-Fi", "Pool", "Kitchen"

        [MaxLength(100)]
        public string? Category { get; set; } // e.g., "Bathroom", "Entertainment", "General"
    }
}