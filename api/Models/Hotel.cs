using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace api.Models
{
    [Table("Hotels")]
    public class Hotel
    {
        public Hotel()
        {
            HotelId = Guid.NewGuid();
        }
        [Key]
        public Guid HotelId { get; set; }

        [Required]
        [MaxLength(200)]
        public string Name { get; set; } = string.Empty;

        [Required]
        public Address Address { get; set; } = new Address();

        public List<string> Photos { get; set; } = new List<string>();
        public string Description { get; set; } = string.Empty;
        public int StarRating { get; set; }
        public virtual ICollection<Amenity> HotelAmenities { get; set; } = new List<Amenity>();

        public virtual ICollection<Room> Rooms { get; set; } = new List<Room>();

        public Guid ProviderId { get; set; }
        [ForeignKey("ProviderId")]
        public virtual User Provider { get; set; } = null!;
    }
}
