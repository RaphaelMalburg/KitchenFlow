using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace backend.DTOs.Account
{
    public class LoginDTO
    {
        [Required]
        public string Email { get; set; }

        public  string Password { get; set; }
    }
}
