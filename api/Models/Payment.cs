using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace api.Models
{
    [Table("Payments")]
    public class Payment
    {
        public Payment()
        {
            PaymentId = Guid.NewGuid();
        }
        [Key]
        public Guid PaymentId { get; set; } // Renommé

        [Column(TypeName = "decimal(18,2)")]
        public decimal Amount { get; set; }
        public DateTime PaymentDate { get; set; } = DateTime.UtcNow;

        [MaxLength(255)]
        public string? PaymentMethodToken { get; set; }

        [Required]
        public PaymentStatus Status { get; set; } = PaymentStatus.PENDING;

        [MaxLength(255)]
        public string? TransactionId { get; set; }

        // Foreign Key & Navigation Property (Un paiement peut utiliser une carte)
        public Guid? CardId { get; set; } // Nullable si d'autres méthodes de paiement existent
        [ForeignKey("CardId")]
        public virtual Card? Card { get; set; }
        //  navigation inverse de Payment vers Booking :
        public Guid BookingId { get; set; }
        public virtual Booking Booking { get; set; } = null!;
    }
}
