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
    public class RecipeRepository :  IRecipesRepository
    {
        private readonly ApplicationDBContext _context;
        public RecipeRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<Recipe> CreateAsync(Recipe recipe)
        {
            await _context.Recipes.AddAsync(recipe);
            await _context.SaveChangesAsync();
            return recipe;
        }

        public async Task<Recipe> DeleteAsync(int id)
        {
            var recipe = await _context.Recipes.FirstOrDefaultAsync(recipe => recipe.Id == id);

            if(recipe == null) return null;

            _context.Recipes.Remove(recipe);
            await _context.SaveChangesAsync();
            return recipe;
        }

        public async Task<List<Recipe>> GetAllAsync(string userId)
        {
            return await _context.Recipes.Where(recipe => recipe.AppUserId == userId).ToListAsync();

        }

        public async Task<Recipe> GetByIdAsync(int id)
        {
            var recipe = await _context.Recipes.FirstOrDefaultAsync(recipe => recipe.Id == id);
            if(recipe == null) return null;
            return recipe;
        }

        public async Task<Recipe> UpdateAsync(Recipe Recipe, int id)
        {
            var recipe = await _context.Recipes.FirstOrDefaultAsync(recipe => recipe.Id == id);
            recipe.Name = Recipe.Name;
            recipe.Description = Recipe.Description;

            await _context.SaveChangesAsync();
            return Recipe;
        }
    }
}
