using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.DTOs.PrepListItem;
using backend.Helpers;
using backend.Models;

namespace backend.Interfaces
{
    public interface IPrepListItemRepository
    {
        Task <PrepListItem> CreateAsync(PrepListItem item);
        Task <bool> IsDone(List<int> ids);
        Task<List<PrepListItem>> GetAllPrepItems (int stationId) ;
        /*Task<List<PrepListItem>> GetAllPrepItems (PrepListItemQueryObject prepListItemQueryObject*/
        Task <PrepListItem?> DeleteAsync(List<int> ids);
        Task <PrepListItem?> DeleteOneAsync(int id);
        Task<PrepListItem> UpdateAsync(PrepListItem prepListItem, int id);
    }
}
