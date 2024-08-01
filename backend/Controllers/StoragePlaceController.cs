using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using backend.DTOs.StoragePlace;
using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class StoragePlaceController : ControllerBase
    {
        private readonly IStoragePlaceRepository _storagePlaceRepo;
        private readonly IStationRepository _stationRepo;
        private readonly IMapper _mapper;
        public StoragePlaceController(IStoragePlaceRepository storagePlaceRepo , IStationRepository stationRepo, IMapper mapper)
        {
            _storagePlaceRepo = storagePlaceRepo;
            _stationRepo = stationRepo;
            _mapper = mapper;
        }

        [HttpPost("{stationId:int}/storageplaces")]

        public async Task<IActionResult> CreateStoragePlaceAsync([FromRoute] int stationId,[FromBody]StoragePlaceDTO storagePlace)
        {
            var station = await _stationRepo.GetByIdAsync(stationId);

            if (station == null)
            {
                return NotFound($"Station with ID {stationId} not found.");
            }


            var newStoragePlace = _mapper.Map<StoragePlace>(storagePlace);
            newStoragePlace.Station = station;

            await _storagePlaceRepo.CreateStoragePlaceAsync(newStoragePlace);

           return Ok(storagePlace);
        }
        [HttpGet("{stationId:int}/storageplaces")]
        public async Task<IActionResult> GetStoragePlaceByIdAsync(int stationId)
        {
            var storagePlaces = await _storagePlaceRepo.GetStoragePlaceByStationIdAsync(stationId);
            return Ok(storagePlaces.Select((sp) => _mapper.Map<StoragePlaceDTO>(sp)));
        }


        [HttpGet("{stationName}/storageplaces")]
        public async Task<IActionResult> GetStoragePlaceByNameAsync(string stationName)
        {
            var storagePlaces = await _storagePlaceRepo.GetStoragePlaceByStationNameAsync(stationName);
            return Ok(storagePlaces.Select((sp) => _mapper.Map<StoragePlaceDTO>(sp)));
        }
        [HttpPatch("{id:int}")]
        public async Task<IActionResult> UpdateAsync([FromRoute]int id,[FromBody] StoragePlaceDTO storagePlace)
        {
            await _storagePlaceRepo.UpdateStoragePlaceAsync(storagePlace,id);
            return Ok(storagePlace);
        }
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteAsync([FromRoute]int id)
        {
            var storagePlace = await _storagePlaceRepo.DeleteStoragePlaceAsync(id);
            if (storagePlace == null)
            {
                return NotFound();
            }

            return NoContent();

        }
    }
}
