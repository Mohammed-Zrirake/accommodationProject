using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Room;
using api.IServices;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/room")]
    public class RoomController : ControllerBase
    {
        private readonly IRoomServices roomServices;

        public RoomController(IRoomServices _roomServices)
        {
            roomServices = _roomServices;
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var room = await roomServices.GetByIdAsync(id);
            if (room == null)
            {
                return NotFound();
            }
            return Ok(room);
        }
        [HttpPost]
        public async Task<IActionResult> CreateRoom([FromForm] CreateRoomRequestDto roomDto)
        {
            try
            {
                var room = await roomServices.CreateRoomAsync(roomDto);
                return CreatedAtAction(nameof(GetById), new { id = room.Id }, room);
            }
            catch (Exception e)
            {
                return StatusCode(500, new { error = "An error occurred while creating the room", details = e.Message });
            }
        }
        [HttpGet]
        
        public async Task<IActionResult> GetAll()
        {
            var rooms = await roomServices.GetAllAsync();
            if (rooms == null)
            {
                return NotFound();
            }
            return Ok(rooms);
        }
    }
}