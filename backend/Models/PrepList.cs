using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class PrepList
    {
       public int Id { get; set; }
       public string Name { get; set; } = string.Empty;
       public string? Description { get; set; } = string.Empty;
       public int? StationId { get; set; }
       public List<PrepListItem> PrepListItems { get; set;} = new List<PrepListItem>();
       public List<int> PrepListItemIds { get; set; } = new List<int>();
       public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
