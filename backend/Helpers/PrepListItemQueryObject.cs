using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Helpers
{
    public class PrepListItemQueryObject
    {
        public string Name { get; set; } = string.Empty;//
        public int PrepListId { get; set; }//
        public int StationId { get; set; }
        public int AmountIn { get; set; }
        public string? SortBy { get; set; } = null;
        public bool IsDescending { get; set; } = false;
        public int PageNumber { get; set; }=1;
        public int PageSize { get; set; }=20;
    }
}
