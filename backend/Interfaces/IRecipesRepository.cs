using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;

namespace backend.Interfaces
{
    public interface IRecipesRepository
    {
        Task<Recipe> CreateAsync(Recipe recipe);
        Task <List<Recipe>> GetAllAsync(string userId);
        Task<Recipe> GetByIdAsync(int id);
        Task<Recipe> UpdateAsync(Recipe Recipe, int id);
        Task<Recipe> DeleteAsync(int id);
    }
}
