using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace api.Models
{
    [Table("Likes")]
    public class Like
    {
        
        public Like()
        {
            LikeId = Guid.NewGuid();
        }
        [Key]
        public Guid LikeId { get; set; } 
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public Guid UserId { get; set; }
        [ForeignKey("UserId")]
        public virtual User User { get; set; } = null!;
        public Guid AccommodationId { get; set; }
        [ForeignKey("AccommodationId")]
        public virtual Accommodation Accommodation { get; set; } = null!;
    }
}
