namespace api.Dtos.Booking;

public record BookingDto(Guid BookingId, string UnitType, Guid UnitId, DateTime CheckInDate,
    DateTime CheckOutDate, int NumberOfGuests, decimal TotalPrice, string Status);
