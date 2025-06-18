using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace api.Models
{
    [Table("Comments")]
    public class Comment
    {
        public Comment()
        {
            CommentId = Guid.NewGuid();
        }
        [Key]
        public Guid CommentId { get; set; }

        [Required]
        public string Text { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
        public bool IsEdited { get; set; }
        public bool IsApproved { get; set; }


        public Guid AuthorId { get; set; }
        [ForeignKey("AuthorId")]
        public virtual User Author { get; set; } = null!;

        public Guid AccommodationId { get; set; }
        [ForeignKey("AccommodationId")]
        public virtual Accommodation Accommodation { get; set; } = null!;
    }
}
