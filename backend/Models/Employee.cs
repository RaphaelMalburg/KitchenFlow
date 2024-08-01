using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class Employee
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public virtual AppUser? AppUser { get; set; }
        public string AppUserId { get; set; }
        public string Role { get; set; } = string.Empty;
    }
}
