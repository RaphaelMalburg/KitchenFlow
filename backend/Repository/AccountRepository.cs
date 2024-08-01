using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using backend.Data;
using backend.DTOs.Account;
using backend.DTOs.Bio;
using backend.DTOs.Email;
using backend.DTOs.Station;
using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository
{
    public class AccountRepository : IAccountRepository
    {
        private readonly ApplicationDBContext _context;
        private readonly UserManager<AppUser> _userManager;
        private readonly IMapper _mapper;
        private readonly ITokenService _tokenService;
        private readonly IMailService _mailService;
        private readonly IStationRepository _stationRepo;

        public AccountRepository(ApplicationDBContext context, IMailService mailService, UserManager<AppUser> userManager, IMapper mapper, IStationRepository stationRepo, ITokenService tokenService)
        {
            _mailService = mailService;
            _context = context;
            _stationRepo = stationRepo;
            _mapper = mapper;
            _tokenService = tokenService;
            _userManager = userManager;
        }

        public async Task<string> ChangeUserPasswordAsync(string userId, string newPassword, string oldPassword)
        {
            var user = await _userManager.FindByIdAsync(userId);
            var result = await _userManager.ChangePasswordAsync(user, oldPassword, newPassword);
            return result.Succeeded ? "Password changed" : "Invalid password";
        }

        public async Task<Bio> CreateAsync(BioDTO bioDTO, string userId)
        {
            var newBio = _mapper.Map<Bio>(bioDTO);
            newBio.AppUserId = userId;

            var userExists = await GetBioAsync(userId);
            if (userExists != null)
            {
                await UpdateBioAsync(userId, bioDTO);
                return newBio;
            }
            await _context.AddAsync(newBio);
            await _context.SaveChangesAsync();
            return newBio;
        }

        public async Task<IdentityResult> RegisterUserAsync(AppUser user, string password)
        {
            return await _userManager.CreateAsync(user, password);
        }

        public async Task AddClaimsAsync(AppUser user, IEnumerable<Claim> claims)
        {
            await _userManager.AddClaimsAsync(user, claims);
        }

        public async Task<string> GenerateEmailConfirmationTokenAsync(AppUser user)
        {
            return await _userManager.GenerateEmailConfirmationTokenAsync(user);
        }

        public async Task<bool> SendEmailAsync(EmailDTO emailDTO)
        {
            return _mailService.SendEmail(emailDTO);
        }

        public async Task<EmployeeDTO> CreateEmployeeAsync(EmployeeDTO employee, string userId)
        {
            var newEmployee = _mapper.Map<Employee>(employee);
            var user = await _userManager.FindByIdAsync(userId);
            var newEmployeeModel = _mapper.Map<EmployeeDTO>(newEmployee);
            if (user != null)
            {
                newEmployee.AppUserId = user.Id;
                await _context.AddAsync(newEmployee);
                await _context.SaveChangesAsync();
                return newEmployeeModel;
            }
            return employee;
        }

        public async Task<bool> DeleteEmployeeAsync(int employeeId)
        {
            var employee = await _context.Employees.FirstOrDefaultAsync(s => s.Id == employeeId);
            if (employee == null) return false;

            _context.Employees.Remove(employee);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteUser(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null) return false;

            var result = await _userManager.DeleteAsync(user);
            return result.Succeeded;
        }

        public async Task<List<EmployeeDTO>> GetAllEmployeesAsync(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            var employees = await _context.Employees.Where(s => s.AppUserId == user.Id).ToListAsync();

            var employeeDtos = employees.Select(employee => _mapper.Map<EmployeeDTO>(employee)).ToList();
            return employeeDtos;
        }

        public async Task<BioDTO> GetBioAsync(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null) return null;

            var bio = await _context.Bio.FirstOrDefaultAsync(s => s.AppUserId == userId);
            return _mapper.Map<BioDTO>(bio);
        }

        public async Task<UserProfileDTO> GetUserProfileAsync(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            var token = await _userManager.GenerateUserTokenAsync(user, "Default", "confirmation");
            if (user == null) return null;

            var stations = await _stationRepo.GetAllAsync(user);
            var newBio = await GetBioAsync(userId);

            return new UserProfileDTO
            {
                Id = user.Id,
                UserName = user.UserName,
                Email = user.Email,
                Token = token,
                Bio = newBio,
                Stations = _mapper.Map<List<StationDTO>>(stations)
            };
        }

        public async Task<BioDTO> UpdateBioAsync(string userId, BioDTO bioDTO)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null) return null;

            var bio = await _context.Bio.FirstOrDefaultAsync(s => s.AppUserId == userId);
            bio.isActive = bioDTO.isActive;
            bio.Email = bioDTO.Email;
            bio.FirstName = bioDTO.FirstName;
            bio.LastName = bioDTO.LastName;
            bio.CompanyName = bioDTO.CompanyName;

            _context.Entry(bio).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return bioDTO;
        }

        public async Task<bool> ResendConfirmationEmailAsync(string email, string scheme, string host)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null || user.EmailConfirmed) return false;

            var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            EmailBodies emailBodies = new EmailBodies();
            var emailBody = emailBodies.ResendEmailConfirmation;

            var callbackUrl = $"{scheme}://{host}/api/Account/ConfirmEmail?userId={user.Id}&code={System.Net.WebUtility.UrlEncode(code)}";
            var body = emailBody.Replace("#URL#", System.Text.Encodings.Web.HtmlEncoder.Default.Encode(callbackUrl));

            EmailDTO emailDTO = new EmailDTO
            {
                To = user.Email,
                Subject = "Confirm your email address by clicking the link",
                Body = body
            };

            return _mailService.SendEmail(emailDTO);
        }

        public async Task<bool> ConfirmEmailAsync(string userId, string code, string scheme, string host)
        {
            if (string.IsNullOrEmpty(userId) || string.IsNullOrEmpty(code)) return false;

            var user = await _userManager.FindByIdAsync(userId);
            if (user == null) return false;

            var result = await _userManager.ConfirmEmailAsync(user, code);
            if (result.Succeeded) return true;

            return false;
        }

        public async Task<NewUserDTO> LoginAsync(LoginDTO loginDTO)
        {
            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Email == loginDTO.Email);
            if (user == null || !await _userManager.CheckPasswordAsync(user, loginDTO.Password) || !user.EmailConfirmed) return null;

            var claims = await _userManager.GetClaimsAsync(user);
            return new NewUserDTO
            {
                UserName = user.Email,
                Email = user.Email,
                Token = _tokenService.CreateToken(user)
            };
        }
    }
}
