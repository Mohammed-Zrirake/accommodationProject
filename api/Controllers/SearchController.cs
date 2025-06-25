using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Helper;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/search")]
    public class SearchController : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetSearchResults([FromQuery] QueryForm queryForm)
        {
            if (queryForm == null)
            {
                return BadRequest("Query parameters cannot be null.");
            }

            // Simulate search results based on the query form
            var results = new List<string>
            {
                $"Search results for city: {queryForm.city}, capacity: {queryForm.capacity}, start date: {queryForm.startDate}, end date: {queryForm.endDate}"
            };

            return Ok(results);
        }
        
    }
}