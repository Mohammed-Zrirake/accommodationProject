using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace api.Models
{
    [Table("Users")]
    public class User : IdentityUser
    {
        // Backwards compatibility with existing code:
        [NotMapped]
        public string UserId
        {
            get => Id;
            set => Id = value;
        }

        [NotMapped]
        public string Username
        {
            get => UserName ?? string.Empty;
            set => UserName = value;
        }

        public DateTime RegistrationDate { get; set; } = DateTime.UtcNow;

        // Navigation properties
        public virtual ICollection<Booking> Bookings { get; set; } = new List<Booking>();
        public virtual Wishlist? Wishlist { get; set; }
        public virtual ICollection<Card> Cards { get; set; } = new List<Card>();
        public virtual ICollection<Review> ReviewsWritten { get; set; } = new List<Review>();
        public virtual ICollection<Comment> CommentsPosted { get; set; } = new List<Comment>();
        public virtual ICollection<Like> LikesGiven { get; set; } = new List<Like>();
        public virtual ICollection<Accommodation> ManagedAccommodations { get; set; } = new List<Accommodation>();
    }
}
