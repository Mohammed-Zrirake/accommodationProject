using System.ComponentModel.DataAnnotations;

namespace api.Dtos.Booking;

public class CreateBookingRequestDto
{
    [Required]
    public Guid UnitId { get; set; }

    /// <summary>accommodation, room, or dorm</summary>
    [Required]
    [RegularExpression("^(accommodation|room|dorm)$", ErrorMessage = "UnitType must be accommodation, room, or dorm.")]
    public string UnitType { get; set; } = string.Empty;

    [Required]
    public DateTime CheckInDate { get; set; }

    [Required]
    public DateTime CheckOutDate { get; set; }

    [Range(1, int.MaxValue)]
    public int NumberOfGuests { get; set; }
}
