using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace api.Models
{
    [Table("Hostels")]

    public class Hostel
    {
        public Hostel()
        {
            HostelId = Guid.NewGuid();
        }
        [Key]
        public Guid HostelId { get; set; }
        [Required]
        [MaxLength(200)]
        public string Name { get; set; } = string.Empty;

        [Required]
        public Address Address { get; set; } = new Address();

        public List<string> Photos { get; set; } = new List<string>();
        public string Description { get; set; } = string.Empty;
        public int StarRating { get; set; }
        public virtual ICollection<Amenity> HostelAmenities { get; set; } = new List<Amenity>();
        public virtual ICollection<Dorm> Dorms { get; set; } = new List<Dorm>();
        // A hostel can also have private rooms
        public virtual ICollection<Room> PrivateRooms { get; set; } = new List<Room>();
        public Guid ProviderId { get; set; }
        [ForeignKey("ProviderId")]
        public virtual User Provider { get; set; } = null!;
    }
}
