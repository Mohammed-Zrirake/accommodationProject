using System.Security.Claims;
using api.Data;
using api.Dtos.Booking;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers;

[ApiController]
[Route("api/bookings")]
[Authorize(Roles = "client")]
public class BookingsController(ApplicationDbContext context) : ControllerBase
{
    [HttpPost]
    public async Task<ActionResult<BookingDto>> Create(CreateBookingRequestDto request)
    {
        if (request.CheckInDate.Date < DateTime.UtcNow.Date || request.CheckOutDate.Date <= request.CheckInDate.Date)
            return BadRequest("Check-out must be after check-in, and check-in cannot be in the past.");

        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? User.FindFirstValue("sub");
        if (string.IsNullOrWhiteSpace(userId)) return Unauthorized();
        if (!await context.Users.AnyAsync(u => u.UserId == userId))
            return Conflict("Your profile is still being synchronized. Please try again in a moment.");

        var unit = await FindUnit(request.UnitType, request.UnitId);
        if (unit is null) return NotFound("The requested accommodation unit was not found.");
        if (request.NumberOfGuests > unit.Capacity) return BadRequest("The number of guests exceeds this unit's capacity.");

        var overlaps = context.Bookings.Where(b => b.Status != BookingStatus.CANCELLED &&
            b.CheckInDate < request.CheckOutDate && b.CheckOutDate > request.CheckInDate);
        overlaps = request.UnitType.ToLowerInvariant() switch
        {
            "accommodation" => overlaps.Where(b => b.AccommodationId == request.UnitId),
            "room" => overlaps.Where(b => b.RoomId == request.UnitId),
            "dorm" => overlaps.Where(b => b.DormId == request.UnitId),
            _ => overlaps.Where(_ => false)
        };
        if (await overlaps.AnyAsync()) return Conflict("Those dates are no longer available.");

        var nights = (request.CheckOutDate.Date - request.CheckInDate.Date).Days;
        var booking = new Booking
        {
            UserId = userId,
            CheckInDate = request.CheckInDate.Date,
            CheckOutDate = request.CheckOutDate.Date,
            NumberOfGuests = request.NumberOfGuests,
            TotalPrice = unit.BasePricePerNight * nights,
            AccommodationId = request.UnitType.Equals("accommodation", StringComparison.OrdinalIgnoreCase) ? request.UnitId : null,
            RoomId = request.UnitType.Equals("room", StringComparison.OrdinalIgnoreCase) ? request.UnitId : null,
            DormId = request.UnitType.Equals("dorm", StringComparison.OrdinalIgnoreCase) ? request.UnitId : null
        };
        context.Bookings.Add(booking);
        await context.SaveChangesAsync();
        return CreatedAtAction(nameof(MyBookings), new { }, ToDto(booking));
    }

    [HttpGet("me")]
    public async Task<ActionResult<IEnumerable<BookingDto>>> MyBookings()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? User.FindFirstValue("sub");
        var bookings = await context.Bookings.Where(b => b.UserId == userId).OrderByDescending(b => b.BookingDate).ToListAsync();
        return Ok(bookings.Select(ToDto));
    }

    private async Task<BookableUnit?> FindUnit(string unitType, Guid id) => unitType.ToLowerInvariant() switch
    {
        "accommodation" => await context.Accommodations.FirstOrDefaultAsync(x => x.Id == id),
        "room" => await context.Rooms.FirstOrDefaultAsync(x => x.Id == id),
        "dorm" => await context.Dorms.FirstOrDefaultAsync(x => x.Id == id),
        _ => null
    };

    internal static BookingDto ToDto(Booking b) => new(b.BookingId,
        b.AccommodationId.HasValue ? "accommodation" : b.RoomId.HasValue ? "room" : "dorm",
        b.AccommodationId ?? b.RoomId ?? b.DormId!.Value, b.CheckInDate, b.CheckOutDate,
        b.NumberOfGuests, b.TotalPrice, b.Status.ToString());
}
