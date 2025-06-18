using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
    [Table("Rooms")]
    public class Room : BookableUnit
    {

        // A Room can belong to a Hotel...
        // CHANGE: Made nullable
        public Guid? HotelId { get; set; }
        [ForeignKey("HotelId")]
        public virtual Hotel? Hotel { get; set; }

        // OR a Room can belong to a Riad...
        // NEW: Added properties for Riad
        public Guid? RiadId { get; set; }
        [ForeignKey("RiadId")]
        public virtual Riad? Riad { get; set; }

        // OR a Room can belong to a Hostel (as a private room)
        // NEW: Added properties for Hostel
        public Guid? HostelId { get; set; }
        [ForeignKey("HostelId")]
        public virtual Hostel? Hostel { get; set; }
    }
}