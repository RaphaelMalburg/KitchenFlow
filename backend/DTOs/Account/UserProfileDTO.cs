using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.DTOs.Bio;
using backend.DTOs.Station;

namespace backend.DTOs.Account
{
 public class UserProfileDTO
{
    public string Id { get; set; }= string.Empty;
    public string UserName { get; set; } = string.Empty;
    public string Email { get; set; }= string.Empty;
    public string Token { get; set; } = string.Empty;
    public BioDTO Bio { get; set; } = new BioDTO();
    public List<StationDTO> Stations { get; set; } = new List<StationDTO>();
}

}
