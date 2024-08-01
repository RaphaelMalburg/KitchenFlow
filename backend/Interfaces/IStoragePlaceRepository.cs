using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.DTOs.StoragePlace;
using backend.Models;

namespace backend.Interfaces
{
    public interface IStoragePlaceRepository
    {
        Task <StoragePlace> CreateStoragePlaceAsync(StoragePlace storagePlace);
        Task <List<StoragePlace>> GetStoragePlaceByStationIdAsync(int stationId);
        Task<StoragePlace> GetByIdAsync(int id);
        Task <List<StoragePlace>> GetStoragePlaceByStationNameAsync(string stationName);
        Task <StoragePlace> UpdateStoragePlaceAsync(StoragePlaceDTO storagePlace, int id);
        Task <StoragePlace> DeleteStoragePlaceAsync( int id);
    }

}
