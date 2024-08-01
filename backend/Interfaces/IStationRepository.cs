using backend.DTOs.Station;
using backend.Models;

namespace backend.Interfaces
{
    public interface IStationRepository
    {
        Task<Station> CreateAsync(StationDTO stationModel,string userId);
        Task <List<Station>> GetAllAsync(AppUser user);
        Task<Station> GetByIdAsync(int id);
        Task<Station> UpdateAsync(StationDTO station, int id);
        Task<Station> DeleteAsync(int id);
    }
}
