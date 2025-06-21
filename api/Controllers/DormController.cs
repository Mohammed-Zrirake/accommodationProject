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
        private readonly IDormServices dormServices;
        private readonly ILogger<DormController> logger;

        public DormController(IDormServices _dormServices, ILogger<DormController> _logger)
        {
            dormServices = _dormServices;
            logger = _logger;
            
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var dorms = await dormServices.GetAllAsync();
            return Ok(dorms); // An empty list is a valid 200 OK response
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var dormDto = await dormServices.GetByIdAsync(id);
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
                var createdDorm = await dormServices.CreateDormAsync(dormDto);
                return CreatedAtAction(nameof(GetById), new { id = createdDorm.Id }, createdDorm);
            }
            catch (ArgumentException ex)
            {
                // Catches specific, known errors like "Hostel not found"
                return BadRequest(new { error = ex.Message });
            }
            catch (Exception ex)
            {
                // Catches unexpected errors
                logger.LogError(ex, "An error occurred while creating a dorm.");
            
                
                return StatusCode(500, new { error = "An internal server error occurred. Please try again later." });
            }
        }
       
        
        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            try
            {
                var deletedDorm = await dormServices.DeleteAsync(id);

                if (deletedDorm == null)
                {
                    return NotFound($"Dorm with ID {id} not found.");
                }

               
                return NoContent();
            }
            catch (Exception ex)
            {
               logger.LogError(ex, "An error occurred while deleting a dorm.");
                return StatusCode(500, new { error = "An internal server error occurred. Please try again later." });
            }
        }

    }
}