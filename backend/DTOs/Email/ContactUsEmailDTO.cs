using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.DTOs.Email
{
    public class ContactUsEmailDTO
    {
        public string Email { get; set; }= "";
        public string Name { get; set; } = "";
        public string Message { get; set; } = "";
    }
}
