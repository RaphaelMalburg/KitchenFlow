using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class Bio
    {
        public int Id { get; set; }
        public string Email { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string CompanyName { get; set; }  = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public bool isActive { get; set; } = true;
        public AppUser? AppUser { get; set; }
        public string AppUserId { get; set; }
    }
}
