using System.ComponentModel.DataAnnotations;
namespace api.Models
{
    public class Address
    {
        [Required]
        [MaxLength(255)]
        public string Street { get; set; } = string.Empty;

        
        

        [Required]
        [MaxLength(100)]
        public string City { get; set; } = string.Empty;

        [MaxLength(100)]
        public string? StateOrProvince { get; set; }

        // CHANGE: PostalCode is optional (nullable)
        [MaxLength(20)]
        public string? PostalCode { get; set; }

        [Required]
        [MaxLength(100)]
        public string Country { get; set; } = string.Empty;

    }
}
