using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Room;
using api.IServices;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace api.Services
{
    public class RoomServices : IRoomServices
    {
        private readonly ApplicationDbContext context;
        private readonly IFileStorageService fileStorage;
        public RoomServices(ApplicationDbContext _context, IFileStorageService _fileStorage)
        {
            context = _context;
            fileStorage = _fileStorage; 
        }
        public async Task<Room> CreateRoomAsync(CreateRoomRequestDto roomDto)
        {
            
              
                var photoUrls = await fileStorage.SaveAllFilesAsync(roomDto.Photos);
                var room = roomDto.ToRoomFromCreateDto(photoUrls);
            if (roomDto.AmenityIds != null && roomDto.AmenityIds.Any())
            {
                var amenities = await context.Amenities
                    .Where(a => roomDto.AmenityIds.Contains(a.AmenityId))
                    .ToListAsync();
                if (amenities.Count != roomDto.AmenityIds.Count)
                {
                    var foundIds = amenities.Select(a => a.AmenityId);
                    var notFoundIds = roomDto.AmenityIds.Except(foundIds);
                    // Throw a specific, actionable exception. The controller will catch this.
                    throw new ArgumentException($"The following amenities were not found: {string.Join(", ", notFoundIds)}");
                }
                room.Amenities = amenities;
            }

                await context.Rooms.AddAsync(room);
                await context.SaveChangesAsync();
                return room;
        }

        public async Task<List<RoomDto>?> GetAllAsync()
        {
            var rooms = await context.Rooms.Include(r => r.Amenities).Select(r => r.ToRoomDto()).AsNoTracking().ToListAsync();
            if (rooms == null)
            {
                return null;
            }
            return rooms;
        }

        public async Task<RoomDto?> GetByIdAsync(Guid id)
        {
            var room = await context.Rooms
                .Include(r => r.Amenities) 
                .AsNoTracking()
                .FirstOrDefaultAsync(r => r.Id == id);

            if (room == null)
            {
                return null;
            }

            return room.ToRoomDto();
        }

        public async Task<Room?> DeleteAsync(Guid id)
        {
            var room = await context.Rooms.FirstOrDefaultAsync(r => r.Id == id);
            if (room == null)
            {
                return null;
            }
            if (room.Photos != null && room.Photos.Any())
            {
                await fileStorage.DeleteAllFilesAsync(room.Photos);
            }

            context.Rooms.Remove(room);
            await context.SaveChangesAsync();
            return room;
        }
    }
}