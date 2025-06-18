using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace api.Models
{
    [Table("Cards")]
    public class Card
    {
        public Card()
        {
            CardId = Guid.NewGuid();
        }
        [Key]
        public Guid CardId { get; set; }

        [Required]
        public string CardNumberHash { get; set; } = string.Empty;

        [Required]
        [MaxLength(200)]
        public string CardHolderName { get; set; } = string.Empty;

        public int ExpiryMonth { get; set; }
        public int ExpiryYear { get; set; }

        [MaxLength(50)]
        public string? CardType { get; set; } // VISA, MASTERCARD
        public bool IsDefault { get; set; }


        public Guid UserId { get; set; }
        [ForeignKey("UserId")]
        public virtual User User { get; set; } = null!;

        public virtual ICollection<Payment> Payments { get; set; } = new List<Payment>();
    }
}
