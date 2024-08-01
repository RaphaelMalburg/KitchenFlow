using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using backend.Data;
using backend.DTOs.StoragePlace;
using backend.Interfaces;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository
{
    public class StoragePlaceRepository : IStoragePlaceRepository
    {
        private readonly ApplicationDBContext _context;
        private readonly IMapper _mapper;
        public StoragePlaceRepository(ApplicationDBContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }
        public async Task<StoragePlace> CreateStoragePlaceAsync(StoragePlace storagePlace)
        {
            await _context.StoragePlaces.AddAsync(storagePlace);
            await _context.SaveChangesAsync();
            return storagePlace;
        }

        public async Task<StoragePlace> DeleteStoragePlaceAsync( int id)
        {
            var storagePlace = await _context.StoragePlaces.FirstOrDefaultAsync(s=>s.Id == id);

            if (storagePlace == null)
            return null;

            _context.StoragePlaces.Remove(storagePlace);
           await  _context.SaveChangesAsync();
            return storagePlace;
        }



        public async Task<StoragePlace> GetByIdAsync(int id)
        {
            var storagePlace = await _context.StoragePlaces.FirstOrDefaultAsync(s=>s.Id == id);
            return storagePlace;
        }

        public async Task<List<StoragePlace>> GetStoragePlaceByStationIdAsync(int stationId)
        {
            // Filter storage places by stationId
            return await _context.StoragePlaces
                .Where(s => s.StationId == stationId)
                .ToListAsync();
        }
         public async Task<List<StoragePlace>> GetStoragePlaceByStationNameAsync(string stationName)
        {
            // Filter storage places by stationId
            return await _context.StoragePlaces
                .Where(s => s.Name == stationName)
                .ToListAsync();
        }

        public async Task<StoragePlace> UpdateStoragePlaceAsync(StoragePlaceDTO storagePlace, int id)
        {
            var storagePlacendb = await _context.StoragePlaces.FirstOrDefaultAsync(s => s.Id == id);
            var newstoragePlacen =  _mapper.Map<StoragePlace>(storagePlacendb);
            storagePlacendb.Name = storagePlace.Name;
            storagePlacendb.Description = storagePlace.Description;
            await _context.SaveChangesAsync();
            return storagePlacendb;

        }
    }
}
