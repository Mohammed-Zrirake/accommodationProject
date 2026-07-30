using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
    [Table("Users")]
    public class User
    {
        
        [Key]
        public string UserId { get; set; }=string.Empty;

        [Required]
        [MaxLength(100)]
        public string Username { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        [MaxLength(255)]
        public string Email { get; set; } = string.Empty;



        public DateTime RegistrationDate { get; set; } = DateTime.UtcNow;

        // Navigation properties
        public virtual ICollection<UserRole> UserRoles { get; set; } = new List<UserRole>();
        public virtual ICollection<Booking> Bookings { get; set; } = new List<Booking>();
        public virtual Wishlist? Wishlist { get; set; }
        public virtual ICollection<Card> Cards { get; set; } = new List<Card>();
        public virtual ICollection<Review> ReviewsWritten { get; set; } = new List<Review>();
        public virtual ICollection<Comment> CommentsPosted { get; set; } = new List<Comment>();
        public virtual ICollection<Like> LikesGiven { get; set; } = new List<Like>();
        public virtual ICollection<Accommodation> ManagedAccommodations { get; set; } = new List<Accommodation>();
    }
}
