using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;

namespace backend.Interfaces
{
    public interface IPrepListRepository
    {
        Task <PrepList> CreateAsync(PrepList prepList);
        Task<List<PrepList>> GetAllAsync(int stationId);
        Task<PrepList> GetById (int prepListId);
        Task<PrepList> DeleteAsync(int prepListId);
    }
}
