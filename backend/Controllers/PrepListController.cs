using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using backend.DTOs.PrepList;
using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PrepListController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IPrepListRepository _prepListRepo;
        private readonly IStoragePlaceRepository _storagePlaceRepo;
        private readonly IStationRepository _stationRepo;
        private readonly IPrepListItemRepository _prepListItemRepo;
        public PrepListController(
                              IPrepListRepository prepListRepo,
                              IStoragePlaceRepository storagePlaceRepo,
                              IStationRepository stationRepo,
                              IMapper mapper,
                              IPrepListItemRepository prepListItemRepo
                              )
        {
            _prepListRepo = prepListRepo;
            _storagePlaceRepo = storagePlaceRepo;
            _stationRepo = stationRepo;
            _mapper = mapper;
            _prepListItemRepo = prepListItemRepo;

        }

        [HttpPost("{stationId:int}")]
        public async Task<ActionResult> CreateAsync([FromRoute] int stationId, [FromBody] PrepListCreationRequest request)
        {
            var station = await _stationRepo.GetByIdAsync(stationId);
            if (station == null)
            {
                return NotFound($"station {stationId} does not exist");
            }

            var newPrepList = _mapper.Map<PrepList>(request.PrepList);
            newPrepList.StationId = stationId;
            newPrepList.CreatedAt = DateTime.UtcNow;

            // Retrieve all PrepListItems associated with the stationId
            var prepListItemList = await _prepListItemRepo.GetAllPrepItems(stationId);

            // Filter the PrepListItems that correspond to the IDs provided
            var matchedPrepListItems = prepListItemList
                .Where(item => request.ListPrepListItemsId.Contains(item.Id))
                .ToList();

            if (matchedPrepListItems.Count != request.ListPrepListItemsId.Count)
            {
                return NotFound("One or more PrepListItems do not exist");
            }
            var matchedPrepListItemsIds = matchedPrepListItems.Select(p => p.Id).ToList();
            // Add the filtered PrepListItems to the new PrepList
            newPrepList.PrepListItems.AddRange(matchedPrepListItems);

            newPrepList.PrepListItemIds.AddRange(matchedPrepListItemsIds);

            // Save the new PrepList to the database
            await _prepListRepo.CreateAsync(newPrepList);

            return Ok(newPrepList);
        }





        [HttpGet("{stationId:int}")]
        public async Task<ActionResult> GetAllAsync([FromRoute]int stationId)
        {
            var prepLists = await _prepListRepo.GetAllAsync(stationId);
            var prepListDTOs = prepLists.Select(x => _mapper.Map<PrepListDTO>(x)).ToList();


            return Ok(prepLists);
        }
        [HttpDelete("{prepListId:int}")]
        public async Task<IActionResult> DeleteAsync([FromRoute]int prepListId)
        {
            await _prepListRepo.DeleteAsync(prepListId);
            return Ok();
        }
    }
}
