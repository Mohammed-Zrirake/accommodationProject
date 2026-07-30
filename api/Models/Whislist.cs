using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace api.Models
{
    [Table("Wishlists")]
    public class Wishlist
    {

        public Wishlist()
        {
            WishlistId = Guid.NewGuid();
        }
        [Key]
        public Guid WishlistId { get; set; } // Renommé

        // Relation 1-1 avec User. WishlistId est la PK. UserId est la FK.
        [Required]
        public string UserId { get; set; }
        [ForeignKey(nameof(UserId))]
        
        public virtual User User { get; set; } = null!;

        public DateTime CreationDate { get; set; } = DateTime.UtcNow;

        public virtual ICollection<WishlistItem> WishlistItems { get; set; } = new List<WishlistItem>();
    }
}
