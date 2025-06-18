using Microsoft.AspNetCore.Mvc.ViewEngines;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace api.Models
{
    [Table("Accommodations")]
    public abstract class Accommodation : BookableUnit
    {
        // Address is specific to standalone accommodations
        [Required]
        public Address Address { get; set; } = new Address();

        [Required]
        public AccommodationStatus Status { get; set; } = AccommodationStatus.PENDING_APPROVAL;

        // Foreign Key for the Provider (owner)
        public Guid ProviderId { get; set; }
        [ForeignKey("ProviderId")]
        public virtual User Provider { get; set; } = null!;

        // Comments are on the main accommodation page
        public virtual ICollection<Comment> Comments { get; set; } = new List<Comment>();
        public virtual ICollection<Like> Likes { get; set; } = new List<Like>();
    }
}
