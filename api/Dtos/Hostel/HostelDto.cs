using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Amenity;
using api.Dtos.Dorm;
using api.Dtos.Room;
using api.Models;

namespace api.Dtos.Hostel
{
    public class HostelDto
    {
        public Guid HostelId { get; set; }
        public string Name { get; set; } = string.Empty;
        public Address Address { get; set; } = new Address();
        public List<string> Photos { get; set; } = new List<string>();
        public string Description { get; set; } = string.Empty;
        public int StarRating { get; set; }
        public ICollection<DormDto> Dorms { get; set; } = new List<DormDto>();
        public ICollection<RoomDto> PrivateRooms { get; set; } = new List<RoomDto>();
        
                public virtual ICollection<AmenityDto> HostelAmenities { get; set; } = new List<AmenityDto>();
        public string ProviderName { get; set; } = string.Empty;
    }
}