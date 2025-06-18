using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
    [Table("Appartements")]
     public class Appartement : Accommodation
    {
        
        public int NumberOfBedrooms { get; set; }
        public int NumberOfBathrooms { get; set; }

        public int? FloorNumber { get; set; }
    }
}
