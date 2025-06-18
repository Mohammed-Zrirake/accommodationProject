using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Dorm;
using api.IServices;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/dorms")]
    public class DormController : ControllerBase
    {
        private readonly IDormServices _dormServices;
        private readonly ILogger<DormController> _logger;

        public DormController(IDormServices dormServices, ILogger<DormController> logger)
        {
            _dormServices = dormServices;
            _logger = logger;
            
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var dorms = await _dormServices.GetAllAsync();
            return Ok(dorms); // An empty list is a valid 200 OK response
        }
        
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var dormDto = await _dormServices.GetByIdAsync(id);
            if (dormDto == null)
            {
                return NotFound($"Dorm with ID {id} not found.");
            }
            return Ok(dormDto);
        }

        [HttpPost]
        public async Task<IActionResult> CreateDorm([FromForm] CreateDormRequestDto dormDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            try
            {
                var createdDorm = await _dormServices.CreateDormAsync(dormDto);
                // Return a 201 Created status with a link to the new resource
                return CreatedAtAction(nameof(GetById), new { id = createdDorm.Id }, createdDorm);
            }
            catch (ArgumentException ex)
            {
                // Catches specific, known errors like "Hostel not found"
                return BadRequest(new { error = ex.Message });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An unexpected error occurred while creating a dorm.");
                return StatusCode(500, new { error = "An internal server error occurred. Please try again later." });
            }
        }
    }
}