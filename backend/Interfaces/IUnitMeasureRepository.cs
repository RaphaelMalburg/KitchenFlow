using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.DTOs.UnitMeasure;
using backend.Models;

namespace backend.Interfaces
{
    public interface IUnitMeasureRepository
    {
        Task <UnitMeasure> CreateAsync (string userId,UnitMeasure unitMeasure);
        Task <UnitMeasure> UpdateAsync(UnitMeasureDTO unitMeasureDTO, int id);
        Task<List<UnitMeasure>> GetAllAsync (string userId);
        Task<UnitMeasure> DeleteAsync (int unitMeasureId);
    }
}
