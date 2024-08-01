using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

public interface IRosterImageRepository
{
    Task<RosterImageDTO> UploadImageAsync(IFormFile image, string userId);
    Task<IEnumerable<RosterImageDTO>> GetAllImagesAsync(string userId);
    Task<RosterImageDTO> GetImageByIdAsync(string fileName, string userId);
    Task DeleteImageAsync(string fileName, string userId);
}
