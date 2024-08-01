using System.Security.Claims;
using backend.DTOs.Station;
using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StationController : ControllerBase
    {
        private readonly IStationRepository _stationRepo;

        private readonly UserManager<AppUser> _userManager;
        public StationController(IStationRepository stationRepo, UserManager<AppUser> userManager)
        {
            _userManager = userManager;
            _stationRepo = stationRepo;

        }

    [HttpPost]
    public async Task<IActionResult> CreateAsync([FromBody] StationDTO station)
    {
        if (station == null)
        {
            return BadRequest("Station data is null");
        }

        var hasUserIdClaim = User.HasClaim(c => c.Type == ClaimTypes.NameIdentifier);
        var userId = hasUserIdClaim ? User.FindFirstValue(ClaimTypes.NameIdentifier) : "Claim not found";


        if (!hasUserIdClaim)
        {
            return Unauthorized("User claim not found");
        }


        if (string.IsNullOrEmpty(userId))
        {
            return Unauthorized("User ID is invalid");
        }

        try
        {
            await _stationRepo.CreateAsync(station, userId);
            // Refactor to CreatedAtAction when the get by id is ready
            return Ok(station);
        }
        catch (Exception ex)
        {
            // Log the exception (if you have a logging mechanism in place)
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

        [HttpGet]

        public async Task<IActionResult> GetAllAsync()
        {
   var hasUserIdClaim = User.HasClaim(c => c.Type == ClaimTypes.NameIdentifier);
    var userId = hasUserIdClaim ? User.FindFirstValue(ClaimTypes.NameIdentifier) : "Claim not found";

            var user = await _userManager.FindByIdAsync(userId);
            var stations = await _stationRepo.GetAllAsync(user);

            return Ok(stations);
        }
        [HttpPatch("{id:int}")]

        public async Task<IActionResult> UpdateAsync([FromRoute]int id,[FromBody] StationDTO station)
        {
            await _stationRepo.UpdateAsync(station,id);

            return Ok(station);
        }
        [HttpDelete("{id:int}")]

        public async Task<IActionResult> DeleteAsync([FromRoute]int id)
        {
            var station = await _stationRepo.DeleteAsync(id);
            if (station == null)
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}
