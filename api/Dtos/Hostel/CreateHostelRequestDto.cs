using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Dorm;
using api.Dtos.Room;
using api.Models;

namespace api.Dtos.Hostel
{
    public class CreateHostelRequestDto
    {
        [Required]
        [MaxLength(200)]
        public string Name { get; set; } = string.Empty;

        [Required]
        public Address Address { get; set; } = new Address();

        public IFormFileCollection Photos { get; set; } = new FormFileCollection();
        public string Description { get; set; } = string.Empty;
        public int StarRating { get; set; }
        public virtual ICollection<Guid> HostelAmenityIds { get; set; } = new List<Guid>();
        
        public Guid ProviderId { get; set; }
    }
}