using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using backend.Data;
using backend.DTOs.UnitMeasure;
using backend.Interfaces;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository
{
    public class UnitMeasureRepository : IUnitMeasureRepository
    {
        private readonly ApplicationDBContext _context;
        private readonly IMapper _mapper;
        public UnitMeasureRepository(ApplicationDBContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }
        public async Task<UnitMeasure> CreateAsync(string userId,UnitMeasure unitMeasure)
        {
            unitMeasure.AppUserId = userId;
            await _context.AddAsync(unitMeasure);
            await _context.SaveChangesAsync();
            return unitMeasure;
        }

        public async Task<UnitMeasure> DeleteAsync(int unitMeasureId)
        {
            var unitMeasure = await _context.UnitsMeasure.FirstOrDefaultAsync(i => i.Id == unitMeasureId);
            if (unitMeasure == null)
                return null;

            _context.UnitsMeasure.Remove(unitMeasure);
            await _context.SaveChangesAsync();

            return unitMeasure;
        }


        public async Task<List<UnitMeasure>> GetAllAsync(string userId )
        {
            var unitMeasure = await _context.UnitsMeasure.Where(s=> s.AppUserId == userId).ToListAsync();
            return unitMeasure;
        }

        public async Task<UnitMeasure> UpdateAsync(UnitMeasureDTO unitMeasureDTO, int id)
        {
            var unitMeasure = await _context.UnitsMeasure.FirstOrDefaultAsync(u=> u.Id == id);
           if (unitMeasure == null)
            return null;
            unitMeasure.Name = unitMeasureDTO.Name;
           await _context.SaveChangesAsync();
           return unitMeasure;

        }
    }
}
