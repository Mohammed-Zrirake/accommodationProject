using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace api.Models
{
    [Table("Reviews")]
    public class Review
    {
        public Review()
        {
            ReviewId = Guid.NewGuid();
        }
        [Key]
        public Guid ReviewId { get; set; }

        [Range(1, 5)]
        public int Rating { get; set; }
        public string? CommentText { get; set; }
        public DateTime ReviewDate { get; set; } = DateTime.UtcNow;
        public bool IsVerifiedStay { get; set; }

        // CHANGE: A review is for a booking. The link to the accommodation is now
        // indirect (Review -> Booking -> BookableUnit). This is cleaner.
        public Guid BookingId { get; set; }
        [ForeignKey("BookingId")]
        public virtual Booking Booking { get; set; } = null!;

        // The Author can be found via the Booking's UserId.
        // The BookableUnit can be found via the Booking's BookableUnitId.
        // This avoids data duplication and potential inconsistencies.
    }
}
