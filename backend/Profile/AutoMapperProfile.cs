


using AutoMapper;
using backend.DTOs.Account;
using backend.DTOs.Bio;
using backend.DTOs.PrepList;
using backend.DTOs.PrepListItem;
using backend.DTOs.Recipes;
using backend.DTOs.Station;
using backend.DTOs.StoragePlace;
using backend.DTOs.UnitMeasure;
using backend.Models;

namespace backend.Profile
{
    public class AutoMapperProfile: AutoMapper.Profile
    {

 public AutoMapperProfile()
        {
            CreateMap<StoragePlace, StoragePlaceDTO>();
            CreateMap<StoragePlaceDTO, StoragePlace>();
            CreateMap<Station, StationDTO>();
            CreateMap<StationDTO, Station>();
            CreateMap<PrepList, PrepListDTO>();
            CreateMap<PrepListDTO, PrepList>();
            CreateMap<PrepListItem, PrepListItemDTO>();
            CreateMap<PrepListItemDTO, PrepListItem>();
            CreateMap<UnitMeasure, UnitMeasureDTO>();
            CreateMap<UnitMeasureDTO, UnitMeasure>();
            CreateMap<BioDTO, Bio>();
            CreateMap<Bio, BioDTO>();
            CreateMap<AppUser, UserProfileDTO>();
            CreateMap<UserProfileDTO, AppUser>();
            CreateMap<Employee, EmployeeDTO>();
            CreateMap<EmployeeDTO, Employee>();
            CreateMap<CreateEmployeeDTO, EmployeeDTO>();
            CreateMap<EmployeeDTO,CreateEmployeeDTO >();
            CreateMap<PrepListItem, PrepListItemDTO>();
            CreateMap<Recipe, RecipesDTO>();
            CreateMap< RecipesDTO,Recipe>();
        }
    }
}
