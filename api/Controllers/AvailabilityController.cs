using api.Data;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers;

[ApiController]
[Route("api/availability")]
public class AvailabilityController(ApplicationDbContext context) : ControllerBase
{
    [HttpGet("{unitType}/{id:guid}/unavailable-dates")]
    public async Task<ActionResult<IEnumerable<string>>> UnavailableDates(string unitType, Guid id)
    {
        var query = context.Bookings.Where(b => b.Status != BookingStatus.CANCELLED);
        query = unitType.ToLowerInvariant() switch
        {
            "accommodation" => query.Where(b => b.AccommodationId == id),
            "room" => query.Where(b => b.RoomId == id),
            "dorm" => query.Where(b => b.DormId == id),
            _ => null!
        };
        if (query is null) return BadRequest("Unit type must be accommodation, room, or dorm.");

        var ranges = await query.Select(b => new { b.CheckInDate, b.CheckOutDate }).ToListAsync();
        var dates = ranges.SelectMany(range => Enumerable.Range(0, (range.CheckOutDate.Date - range.CheckInDate.Date).Days)
            .Select(day => range.CheckInDate.Date.AddDays(day).ToString("yyyy-MM-dd")))
            .Distinct().OrderBy(x => x);
        return Ok(dates);
    }
}
