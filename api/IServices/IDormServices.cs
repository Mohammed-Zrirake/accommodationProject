using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Dorm;
using api.Models;

namespace api.IServices
{
    public interface IDormServices
    {
        Task<DormDto?> GetByIdAsync(Guid id);
        Task<List<DormDto>> GetAllAsync();
        Task<DormDto> CreateDormAsync(CreateDormRequestDto dormDto);
        Task<Dorm?> DeleteAsync(Guid id);
    }
}