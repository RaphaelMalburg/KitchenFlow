using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using backend.Data;
using backend.DTOs.PrepListItem;
using backend.Helpers;
using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository
{
    public class PrepListItemRepository : IPrepListItemRepository
    {
        private readonly ApplicationDBContext _context;
        private readonly IMapper _mapper;
        public PrepListItemRepository(ApplicationDBContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<PrepListItem> CreateAsync(PrepListItem item)
        {
            await _context.PrepListsItem.AddAsync(item);
            await _context.SaveChangesAsync();
            return item;
        }

        public async Task<PrepListItem?> DeleteAsync(List<int> ids)
        {
           foreach(var itemId in ids)
           {
             var item = await _context.PrepListsItem.FirstOrDefaultAsync(x=> x.Id == itemId);
             _context.PrepListsItem.Remove(item);
           }
           await _context.SaveChangesAsync();
           return null;
        }

        public async Task<PrepListItem?> DeleteOneAsync(int id)
        {
            var prepListItem = await _context.PrepListsItem.FirstOrDefaultAsync(i => i.Id == id);
            if (prepListItem == null)
                return null;

            _context.PrepListsItem.Remove(prepListItem);
            await _context.SaveChangesAsync();

            return prepListItem;
        }

        public async Task<List<PrepListItem>> GetAllPrepItems(int stationId)
        {
            var list = await _context.PrepListsItem.Where(x => x.StationId == stationId).ToListAsync();
            return list;
        }

        /*
               public async Task<List<PrepListItem>> GetAllPrepItems(PrepListItemQueryObject  prepListItemQueryObject)
        {

            var list = _context.PrepListsItem.Where(x=>x.StationId == prepListItemQueryObject.StationId).AsQueryable();

            if (!string.IsNullOrEmpty(prepListItemQueryObject.Name))
            {
                list = list.Where(x => x.Name.Contains(prepListItemQueryObject.Name));
            }

            if (!string.IsNullOrEmpty(prepListItemQueryObject.PrepListId.ToString()))
            {
                list = list.Where(x => x.PrepListId == prepListItemQueryObject.PrepListId);
            }

            if(!string.IsNullOrEmpty(prepListItemQueryObject.SortBy))
            {

                if(!string.IsNullOrEmpty(prepListItemQueryObject.AmountIn.ToString()))
                {
                    list = prepListItemQueryObject.IsDescending? list.OrderByDescending(x=>x.Amount): list.OrderBy(x=>x.Amount);
                }
            }

             var skipNumber = (prepListItemQueryObject.PageNumber -1) * prepListItemQueryObject.PageSize;
            var list2=  await list.Skip(skipNumber).Take(prepListItemQueryObject.PageSize).ToListAsync();
            Console.WriteLine("-----------------------"+list2+ " " + skipNumber  +"---------------------------------------------------------------");
           return list2;


                /*

                return await _context.PrepListsItem
                .Where(s => s.PrepListId == prepListItemId)
                .ToListAsync();
                */




         public async Task<bool> IsDone(List<int> ids)
        {
            foreach (var id in ids)
            {

            var item = await _context.PrepListsItem.FirstOrDefaultAsync(x=> x.Id == id);

            item!.IsDone = !item.IsDone;
            }
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<PrepListItem> UpdateAsync(PrepListItem PrepListItem, int id)
        {
          var prepListItem = await _context.PrepListsItem.FirstOrDefaultAsync(item => item.Id == id);

        if (prepListItem == null)
        {
            return null;
        }

        prepListItem.Name = PrepListItem.Name;
        prepListItem.Amount = PrepListItem.Amount;
        prepListItem.StoragePlaceId = PrepListItem.StoragePlaceId;
        prepListItem.UnitMeasureId = PrepListItem.UnitMeasureId;
        prepListItem.IsDone = PrepListItem.IsDone;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateException ex)
        {
            // Log the exception (ex) here
            throw new Exception("An error occurred while updating the database.", ex);
        }

        return prepListItem;
        }
    }
}
