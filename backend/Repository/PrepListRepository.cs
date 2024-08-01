using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Interfaces;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository
{
    public class PrepListRepository: IPrepListRepository
    {
        private readonly ApplicationDBContext _context;
        public PrepListRepository(ApplicationDBContext context)
        {
            _context = context;
        }



    public async Task<PrepList> CreateAsync(PrepList prepList)
    {
        await _context.PrepLists.AddAsync(prepList);
        await _context.SaveChangesAsync();
        return prepList;
    }

        public async Task<PrepList> DeleteAsync(int prepListId)
        {
        // Fetch the PrepList to be deleted (including PrepListItems)
        var prepList = await _context.PrepLists
            .Include(pl => pl.PrepListItems)
            .FirstOrDefaultAsync(x => x.Id == prepListId);

        if (prepList == null)
        {
            return null; // PrepList not found
        }

        // Delete all associated PrepListItems
        _context.PrepListsItem.RemoveRange(prepList.PrepListItems);

        // Delete the PrepList itself
        _context.PrepLists.Remove(prepList);

        // Save changes to the database
        await _context.SaveChangesAsync();

        return prepList;
        }


        public async Task<List<PrepList>> GetAllAsync( int stationId)
        {
            return await _context.PrepLists
                .Where(s =>  s.StationId == stationId)
                .ToListAsync();
        }

        public async Task<PrepList> GetById(int prepListId)
        {
            return await _context.PrepLists.FirstOrDefaultAsync(x => x.Id == prepListId);
        }
    }
}
