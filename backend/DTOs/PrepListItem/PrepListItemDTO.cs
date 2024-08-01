using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.DTOs.UnitMeasure;
using backend.Models;

namespace backend.DTOs.PrepListItem
{
    public class PrepListItemDTO
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public int Amount { get; set; }
        public int StationId { get; set; }
        public int StoragePlaceId { get; set; }
        public int UnitMeasureId { get; set; }
        public bool IsDone { get; set; }
    }
}
