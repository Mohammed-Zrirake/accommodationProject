using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
    public abstract class BookableUnit
    {
        public BookableUnit()
        {
            Id = Guid.NewGuid(); 
        }
        [Key]
        public Guid Id { get; set; }

        [Required]
        [MaxLength(200)]
        public string Name { get; set; } = string.Empty; // e.g., "Cozy Downtown Apartment" or "Queen Room with Ocean View"

        [Required]
        public string Description { get; set; } = string.Empty;

        public List<string> Photos { get; set; } = new List<string>();

        [Column(TypeName = "decimal(18,2)")]
        public decimal BasePricePerNight { get; set; }

        public int Capacity { get; set; } // Max number of guests

        public string? Rules { get; set; }

        [NotMapped]
        public double AverageRating { get; set; } // Calculated from reviews

        // CHANGE: Using a many-to-many relationship for amenities
        public virtual ICollection<Amenity> Amenities { get; set; } = new List<Amenity>();

        // Navigation properties common to all bookable units
        public virtual ICollection<Booking> Bookings { get; set; } = new List<Booking>();
        public virtual ICollection<Review> Reviews { get; set; } = new List<Review>();
        public virtual ICollection<WishlistItem> WishlistItems { get; set; } = new List<WishlistItem>();
    }
}