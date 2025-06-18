using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
    [Table("WishlistItems")]
    public class WishlistItem
    {

        public Guid WishlistItemId { get; set; } = Guid.NewGuid();

        public Guid WishlistId { get; set; }
        public virtual Wishlist Wishlist { get; set; } = null!;

        public Guid? AccommodationId { get; set; }
        public virtual Accommodation? Accommodation { get; set; }


        public Guid? RoomId { get; set; }
        public virtual Room? Room { get; set; }


        public Guid? DormId { get; set; }
        public virtual Dorm? Dorm { get; set; }

        [NotMapped]
        public BookableUnit? Item
        {
            get => Accommodation as BookableUnit ?? Room as BookableUnit ?? Dorm as BookableUnit;
        }

        public DateTime DateAdded { get; set; } = DateTime.UtcNow;
    }
}
