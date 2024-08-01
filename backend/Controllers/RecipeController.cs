using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using backend.DTOs.Recipes;
using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RecipeController : ControllerBase
    {
        private readonly IRecipesRepository _recipesRepo;
        private readonly IMapper _mapper;
        public RecipeController(IRecipesRepository recipesRepo, IMapper mapper)
        {
            _recipesRepo = recipesRepo;
            _mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> CreateAsync([FromBody] RecipesDTO recipesDTO)
        {
               var hasUserIdClaim = User.HasClaim(c => c.Type == ClaimTypes.NameIdentifier);
    var userId = hasUserIdClaim ? User.FindFirstValue(ClaimTypes.NameIdentifier) : "Claim not found";

            var recipesModel = _mapper.Map<Recipe>(recipesDTO);
            recipesModel.AppUserId = userId;
            if (recipesModel == null) return null;
            await _recipesRepo.CreateAsync(recipesModel);
            return Ok(recipesModel);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllAsync()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var recipes = await _recipesRepo.GetAllAsync(userId);
            return Ok(recipes);

        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetByIdAsync([FromRoute] int id)
        {

            var recipe = await _recipesRepo.GetByIdAsync(id);
            return Ok(recipe);

        }
        [HttpPatch]
        public async Task<IActionResult> UpdateAsync([FromBody] RecipesDTO recipesDTO)
        {

            var recipesModel = _mapper.Map<Recipe>(recipesDTO);
            await _recipesRepo.UpdateAsync(recipesModel,recipesDTO.Id);
            return Ok(recipesModel);
        }

        [HttpDelete("{id:int}")]
        public async Task DeleteAsync([FromRoute] int id)
        {
            await _recipesRepo.DeleteAsync(id);

        }
    }
}
