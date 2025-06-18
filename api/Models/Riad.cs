using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
    [Table("Riads")]
    public class Riad 
    {
        public Riad()
    {
        Id = Guid.NewGuid();
    }
    
    [Key]
    public Guid Id { get; set; }

    [Required]
    [MaxLength(200)]
    public string Name { get; set; } = string.Empty;

    [Required]
    public Address Address { get; set; } = new Address();

    public string Description { get; set; } = string.Empty;
    public List<string> Photos { get; set; } = new List<string>();

    // Riad-specific properties
    public bool HasCourtyard { get; set; }
    public bool TraditionalDecor { get; set; }

    // Riad contains Rooms
    public virtual ICollection<Room> Rooms { get; set; } = new List<Room>();

    // Foreign Key for the Provider
    public Guid ProviderId { get; set; }
    [ForeignKey("ProviderId")]
    public virtual User Provider { get; set; } = null!;
}
}
