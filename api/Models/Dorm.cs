using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
    [Table("Dorms")]
    public class Dorm : BookableUnit
    {
        // Capacity in BookableUnit now means number of beds in this dorm.
        // BasePricePerNight is the price per bed.
        public Guid HostelId { get; set; }
        [ForeignKey("HostelId")]
        public virtual Hostel Hostel { get; set; } = null!;
    }
}