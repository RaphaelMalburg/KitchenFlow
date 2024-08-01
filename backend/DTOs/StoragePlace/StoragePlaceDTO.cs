using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.DTOs.StoragePlace
{
    public class StoragePlaceDTO
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public int? StationId { get; set; }
        public string? Description { get; set; } = string.Empty;
    }
}
