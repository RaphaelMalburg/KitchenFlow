using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace backend.Models
{
    public class PrepListItem
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public int Amount { get; set; }
        public int StationId { get; set; }
        public bool IsDone { get; set; }= false;
        [JsonIgnore]
        public virtual Station? Station { get; set; }
        public int? StoragePlaceId { get; set; }
        public virtual StoragePlace? StoragePlace { get; set; }
        public int? PrepListId { get; set; }
        public  PrepList? PrepList { get; set; }
        public int UnitMeasureId { get; set; }
        public virtual UnitMeasure? UnitMeasure { get; set; }
    }
}
