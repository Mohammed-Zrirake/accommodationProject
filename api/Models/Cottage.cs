using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
    [Table("Cottages")]
    public class Cottage : Accommodation
    {
        public int NumberOfBedrooms { get; set; }
        public int NumberOfBathrooms { get; set; }
        public bool IsDetached { get; set; }
        public bool HasFireplace { get; set; }
    }
}
