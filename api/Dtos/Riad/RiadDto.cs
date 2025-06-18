using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Room;
using api.Models;

namespace api.Dtos.Riad
{
    public class RiadDto
    {
       public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public Address Address { get; set; } = new Address();
        public string Description { get; set; } = string.Empty;
        public List<string> Photos { get; set; } = new List<string>();

        // Riad-specific properties
        public bool HasCourtyard { get; set; }
        public bool TraditionalDecor { get; set; }

        // Flattened Provider information for convenience
        public Guid ProviderId { get; set; }
        public string ProviderName { get; set; } = string.Empty;

        // Collection of rooms within the Riad
        public ICollection<RoomDto> Rooms { get; set; } = new List<RoomDto>();
    }
}