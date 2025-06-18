using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
    [Table("Users")]
    public class User
    {
        public User()
        {
            UserId = Guid.NewGuid();
        }
        [Key]
        public Guid UserId { get; set; }

        [Required]
        [MaxLength(100)]
        public string Username { get; set; } = string.Empty;

        [MaxLength(100)]
        public string? FirstName { get; set; }

        [MaxLength(100)]
        public string? LastName { get; set; }

        [Required]
        [EmailAddress]
        [MaxLength(255)]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string PasswordHash { get; set; } = string.Empty;

        [Phone]
        [MaxLength(20)]
        public string? PhoneNumber { get; set; }

        public DateTime RegistrationDate { get; set; } = DateTime.UtcNow;
        public DateTime? LastLogin { get; set; }
        public bool IsActive { get; set; } = true;

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
