using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class StoragePlace
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; } = string.Empty;
        public virtual Station? Station { get; set; }
        public int? StationId { get; set; }
        public List<PrepListItem> prepListItems { get; set; } = new List<PrepListItem>();
        public List<PrepList> PrepLists { get; set;} = new List<PrepList>();
    }
}
