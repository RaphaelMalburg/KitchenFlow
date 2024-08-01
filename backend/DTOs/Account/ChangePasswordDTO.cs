using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace backend.DTOs.Account
{
    public class ChangePasswordDTO
    {
         [Required]
    [StringLength(100, ErrorMessage = "The {0} must be at least {8} characters long.", MinimumLength = 6)]
    [DataType(DataType.Password)]
    public string OldPassword { get; set; }

    [Required]
    [StringLength(100, ErrorMessage = "The {0} must be at least {8} characters long.", MinimumLength = 6)]
    [DataType(DataType.Password)]
    public string NewPassword { get; set; }



    }
}
