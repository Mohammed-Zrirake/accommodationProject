using Microsoft.AspNetCore.Mvc.ViewEngines;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace api.Models
{
    [Table("Bookings")]
    public class Booking
    {
        public Booking()
        {
            BookingId = Guid.NewGuid();
        }
        [Key]
        public Guid BookingId { get; set; }

        public DateTime CheckInDate { get; set; }
        public DateTime CheckOutDate { get; set; }
        public int NumberOfGuests { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal TotalPrice { get; set; }
        public DateTime BookingDate { get; set; } = DateTime.UtcNow;

        [Required]
        public BookingStatus Status { get; set; } = BookingStatus.PENDING;



        // --- The Polymorphic Foreign Keys ---
        public Guid? AccommodationId { get; set; }
        public Guid? RoomId { get; set; }
        public Guid? DormId { get; set; }

        // --- Navigation Properties ---
        [ForeignKey("AccommodationId")]
        public virtual Accommodation? Accommodation { get; set; }
        [ForeignKey("RoomId")]
        public virtual Room? Room { get; set; }
        [ForeignKey("DormId")]
        public virtual Dorm? Dorm { get; set; }
        public Guid UserId { get; set; }
        [ForeignKey("UserId")]
        public virtual User User { get; set; } = null!;
        public virtual Payment? Payment { get; set; }
        public virtual Review? Review { get; set; }
        [NotMapped]
        public BookableUnit? BookedItem
        {
            get => Accommodation as BookableUnit ?? Room as BookableUnit ?? Dorm as BookableUnit;
        }
    }
}
