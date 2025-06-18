using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.WishlistItem
{
    public class WishlistItemDto
    {
         public Guid WishlistItemId { get; set; }
        public DateTime DateAdded { get; set; }

        // We include the IDs so the client knows what type of item it is
        public Guid? AccommodationId { get; set; }
        public Guid? RoomId { get; set; }
        public Guid? DormId { get; set; }

        // We flatten the item's details for easy display in a list
        public Guid ItemId { get; set; }
        public string ItemName { get; set; } = string.Empty;
        public string? ItemPrimaryPhoto { get; set; }
        public decimal ItemBasePricePerNight { get; set; }
    }
}