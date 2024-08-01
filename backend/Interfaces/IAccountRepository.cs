using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using backend.DTOs.Account;
using backend.DTOs.Bio;
using backend.DTOs.Email;
using backend.Models;
using Microsoft.AspNetCore.Identity;

namespace backend.Interfaces
{
    public interface IAccountRepository
    {
        Task<Bio> CreateAsync(BioDTO bioDTO, string userId);
        Task<UserProfileDTO> GetUserProfileAsync(string userId);
        Task<BioDTO> GetBioAsync(string userId);
        Task<BioDTO> UpdateBioAsync(string userId, BioDTO bioDTO);
        Task<string> ChangeUserPasswordAsync(string userId, string newPassword, string oldPassword);
        Task<bool> DeleteUser(string userId);
        Task<EmployeeDTO> CreateEmployeeAsync(EmployeeDTO employee, string userId);
        Task<bool> DeleteEmployeeAsync(int employeeId);
        Task<List<EmployeeDTO>> GetAllEmployeesAsync(string userId);
        Task<IdentityResult> RegisterUserAsync(AppUser user, string password);
        Task AddClaimsAsync(AppUser user, IEnumerable<Claim> claims);
        Task<string> GenerateEmailConfirmationTokenAsync(AppUser user);
        Task<bool> SendEmailAsync(EmailDTO emailDTO);
        Task<bool> ResendConfirmationEmailAsync(string email, string scheme, string host);
        Task<bool> ConfirmEmailAsync(string userId, string code, string scheme, string host);
        Task<NewUserDTO> LoginAsync(LoginDTO loginDTO);
    }
}
