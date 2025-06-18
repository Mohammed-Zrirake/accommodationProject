using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.WishlistItem;

namespace api.Dtos.Wishlist
{
    public class WishlistDto
    {
        public Guid WishlistId { get; set; }
        public Guid UserId { get; set; }
        public DateTime CreationDate { get; set; }
        public ICollection<WishlistItemDto> WishlistItems { get; set; } = new List<WishlistItemDto>();
    }
}