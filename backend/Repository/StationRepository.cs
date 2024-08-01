using System.Security.Claims;
using AutoMapper;
using backend.Data;
using backend.DTOs.Station;
using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository
{
    public class StationRepository : IStationRepository
    {
        private readonly ApplicationDBContext _context;
        private readonly IStoragePlaceRepository _storagePlace;
        private readonly IPrepListRepository _prepListRepo;
        private readonly SignInManager<AppUser> _userManager;

        private readonly IMapper _mapper;
        public StationRepository(ApplicationDBContext context, IMapper mapper,IStoragePlaceRepository storageRepo, IPrepListRepository prepListRepo, SignInManager<AppUser> userManager)
        {
            _userManager = userManager;
            _context = context;
            _mapper = mapper;
            _prepListRepo = prepListRepo;
            _storagePlace= storageRepo;
        }
        public async Task<Station> CreateAsync(StationDTO stationModelDTO, string userId)
        {
  var user = await _context.Users.FindAsync(userId);
            if (user == null)
            {
                throw new Exception("User not found");
            }

            var station = new Station
            {
                Name = stationModelDTO.Name,
                AppUserId = userId,
                AppUser = user
            };

            _context.Stations.Add(station);
            await _context.SaveChangesAsync();
            return station;
        }

        public async Task<List<Station>> GetAllAsync(AppUser appUser)
        {
            var stations = await _context.Stations
                .Where(s => s.AppUserId == appUser.Id)
                .Include(a => a.AppUser)
                .ToListAsync();
            return stations;
        }

        public async Task<Station> GetByIdAsync(int id)
        {
            var station = await _context.Stations.Include(a => a.AppUser).FirstOrDefaultAsync(s=>s.Id == id);
            return station;
        }

        public async Task<Station> UpdateAsync(StationDTO station, int id)
        {
            var stationdb = await _context.Stations.FirstOrDefaultAsync(s => s.Id == id);
            var newStation =  _mapper.Map<Station>(stationdb);
            stationdb.Name = station.Name;
            await _context.SaveChangesAsync();
            return stationdb;

        }
        public async Task<List<StoragePlace>> GetStoragePlacesByStationIdAsync(int stationId)
        {
            return await _context.StoragePlaces.Where(sp => sp.StationId == stationId).ToListAsync();
        }

        public async Task<Station> DeleteAsync(int id)
        {
            var station = await _context.Stations.FirstOrDefaultAsync(s => s.Id == id);
             if (station == null)
                return null;

            var storagePlaces = await GetStoragePlacesByStationIdAsync(id);

            _context.StoragePlaces.RemoveRange(storagePlaces);

            // For each storage place, delete prep lists
            foreach (var storagePlace in storagePlaces)
            {
                var prepLists = _context.PrepLists.Where(pl => pl.StationId == storagePlace.StationId);
                _context.PrepLists.RemoveRange(prepLists);
            }

            // Delete the station
            _context.Stations.Remove(station);

            await  _context.SaveChangesAsync();
            return station;
        }
    }
}
