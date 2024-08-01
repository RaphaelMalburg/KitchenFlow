using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using backend.DTOs.UnitMeasure;
using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UnitMeasureController : Controller
    {
        private readonly IUnitMeasureRepository _unitMeasureRepo;
        private readonly IMapper _mapper;
        public UnitMeasureController(IUnitMeasureRepository unitMeasureRepo, IMapper mapper)
        {
            _unitMeasureRepo = unitMeasureRepo;
            _mapper = mapper;
        }
        [HttpPost]
        public async Task<IActionResult> CreateUnitMeasure(UnitMeasureDTO unitMeasureDTO)
        {
   var hasUserIdClaim = User.HasClaim(c => c.Type == ClaimTypes.NameIdentifier);
    var userId = hasUserIdClaim ? User.FindFirstValue(ClaimTypes.NameIdentifier) : "Claim not found";

            var newUnitMeasure = _mapper.Map<UnitMeasure>(unitMeasureDTO);
            await _unitMeasureRepo.CreateAsync(userId,newUnitMeasure);
            return Ok(newUnitMeasure);
        }
        [HttpGet]
        public async Task<IActionResult> GetAllAsync()
        {
               var hasUserIdClaim = User.HasClaim(c => c.Type == ClaimTypes.NameIdentifier);
    var userId = hasUserIdClaim ? User.FindFirstValue(ClaimTypes.NameIdentifier) : "Claim not found";

            var units = await _unitMeasureRepo.GetAllAsync(userId);
            return Ok(units);
        }
        [HttpDelete("{unitMeasureId:int}")]
        public async Task<IActionResult> DeleteAsync([FromRoute]int unitMeasureId)
        {
            await _unitMeasureRepo.DeleteAsync(unitMeasureId);
            return NoContent();
        }
        [HttpPatch]
        public async Task<IActionResult> UpdateAsync([FromBody]UnitMeasureDTO unitMeasureDTO)
        {
            var lol = new List<int>();

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
           var unitMeasureUpdated = await _unitMeasureRepo.UpdateAsync(unitMeasureDTO,unitMeasureDTO.Id);
           return Ok(unitMeasureUpdated);
        }
    }
}
