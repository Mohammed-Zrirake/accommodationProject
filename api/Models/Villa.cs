using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
    [Table("Villas")]
    public class Villa : Accommodation
    {
        
        public int NumberOfBedrooms { get; set; }
        public int NumberOfBathrooms { get; set; }

    }
}
