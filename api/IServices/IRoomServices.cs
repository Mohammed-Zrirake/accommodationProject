using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Room;
using api.Models;

namespace api.IServices
{
    public interface IRoomServices
    {
        Task<List<RoomDto>?> GetAllAsync();
        Task<RoomDto?> GetByIdAsync(Guid id);
        Task<Room> CreateRoomAsync(CreateRoomRequestDto roomDto);

    }
}