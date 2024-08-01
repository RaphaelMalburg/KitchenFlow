using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.DTOs.Station
{
    public class StationDTO
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;
        public string UserId { get; set; } = string.Empty;
    }
}
