using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using backend.DTOs.PrepListItem;
using backend.Helpers;
using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PrepListItemController : Controller
    {
        private readonly IPrepListItemRepository _prepListItemRepo;
        private readonly IPrepListRepository _prepListRepo;
        private readonly IStationRepository _stationRepo;
        private readonly IMapper _mapper;
        public PrepListItemController(IPrepListItemRepository prepListItemRepo, IPrepListRepository prepListRepo, IMapper mapper , IStationRepository stationRepo)
        {
            _prepListItemRepo = prepListItemRepo;
            _prepListRepo = prepListRepo;
            _stationRepo = stationRepo;
            _mapper = mapper;
        }

        [HttpPost("{stationId}")]
        public async Task<IActionResult> CreatePrepListItem(PrepListItemDTO prepListItemDTO, [FromRoute] int stationId)
        {
            var station = await _stationRepo.GetByIdAsync(stationId);
            if (station == null)
            {
                return NotFound($" station id {stationId} does not exist ");
            }
            var newPrepListItem = _mapper.Map<PrepListItem>(prepListItemDTO);
            newPrepListItem.IsDone= false;
            newPrepListItem.Station = station;
            await _prepListItemRepo.CreateAsync(newPrepListItem);
            return Ok(newPrepListItem);

        }
        [HttpPatch("prepListItemsCheck")]
        public async Task<IActionResult> UpdateIsDone([FromBody]List<int> ids)
        {
           await _prepListItemRepo.IsDone(ids);
           return Ok();
        }

        [HttpGet("{stationId:int}")]
        public async Task<IActionResult> GetAll([FromRoute] int stationId)
        {

            var list =await _prepListItemRepo.GetAllPrepItems(stationId);
            var newList = _mapper.Map<List<PrepListItemDTO>>(list);
            return Ok(newList);
        }
    /*   public async Task<IActionResult> GetAll([FromQuery] PrepListItemQueryObject query)
        {
            Console.WriteLine($"StationId: {query.StationId}, Name: {query.Name}, PrepListId: {query.PrepListId}");
            var list =await _prepListItemRepo.GetAllPrepItems(query);
            var newList = _mapper.Map<List<PrepListItemDTO>>(list);
            return Ok(newList);
        }*/
        [HttpDelete]
        [Route("multiple")]
        public async Task<IActionResult> DeleteMultiple([FromBody] List<int> ids)
        {
            await _prepListItemRepo.DeleteAsync(ids);
            return NoContent();
        }
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete([FromRoute]int id)
        {
            await _prepListItemRepo.DeleteOneAsync(id);
            return NoContent();
        }
    [HttpPatch]
    public async Task<IActionResult> Update([FromBody] PrepListItemDTO prepListItemDTO)
    {

        var prepList = _mapper.Map<PrepListItem>(prepListItemDTO);
        var result = await _prepListItemRepo.UpdateAsync(prepList, prepListItemDTO.Id);

        if (result == null)
        {
            return NotFound();
        }

        return Ok(result);
    }

    }
}
