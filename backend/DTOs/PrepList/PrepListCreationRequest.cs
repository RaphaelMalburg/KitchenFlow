using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.DTOs.PrepListItem;

namespace backend.DTOs.PrepList
{
    public class PrepListCreationRequest
    {
    public PrepListDTO PrepList { get; set; } = new PrepListDTO();
    public List<int> ListPrepListItemsId { get; set; } = new List<int>();
    }
}
