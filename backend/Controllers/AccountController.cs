using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using backend.DTOs.Account;
using backend.DTOs.Bio;
using backend.DTOs.Email;
using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using RestSharp;
using RestSharp.Authenticators;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly IAccountRepository _accountRepo;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly UserManager<AppUser> _userManager;
        private readonly IConfiguration _configuration;
        private readonly IMapper _mapper;
        private readonly ITokenService _tokenService;
        private readonly IMailService _mailService;
        private readonly IRosterImageRepository _rosterImageRepo;

        public AccountController(
            IRosterImageRepository rosterImageRepo,
            IMailService mailService,
            IAccountRepository accountRepo,
            SignInManager<AppUser> signInManager,
            UserManager<AppUser> userManager,
            IMapper mapper,
            IConfiguration configuration,
            ITokenService tokenService)
        {
            _rosterImageRepo = rosterImageRepo;
            _mailService = mailService;
            _accountRepo = accountRepo;
            _signInManager = signInManager;
            _userManager = userManager;
            _mapper = mapper;
            _configuration = configuration;
            _tokenService = tokenService;
        }

        [Authorize]
        [HttpPost("upload")]
        public async Task<IActionResult> UploadImage([FromForm] IFormFile image)
        {
            if (image == null || image.Length == 0)
            {
                return BadRequest("Image is required.");
            }

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (userId == null)
            {
                return Unauthorized("User not found.");
            }

            var uploadedImage = await _rosterImageRepo.UploadImageAsync(image, userId);
            return Ok(uploadedImage);
        }

        [Authorize]
        [HttpGet("all")]
        public async Task<IActionResult> GetAllImages()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            var images = await _rosterImageRepo.GetAllImagesAsync(userId);
            return Ok(images);
        }

        [Authorize]
        [HttpGet("{fileName}")]
        public async Task<IActionResult> GetImageById(string fileName)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var image = await _rosterImageRepo.GetImageByIdAsync(fileName, userId);
            if (image == null)
            {
                return NotFound();
            }
            return Ok(image);
        }

        [HttpPost("deleteimage")]
        public async Task<IActionResult> DeleteImage([FromBody] DeleteImageRequest request)
        {
            if (string.IsNullOrEmpty(request.FileName))
            {
                return BadRequest("File name is required.");
            }
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            await _rosterImageRepo.DeleteImageAsync(request.FileName, userId);
            return NoContent();
        }

        [Authorize]
        [HttpGet("credentials")]
        public async Task<IActionResult> UserCredentials()
        {
            try
            {
                var hasUserIdClaim = User.HasClaim(c => c.Type == ClaimTypes.NameIdentifier);
                var userId = hasUserIdClaim ? User.FindFirstValue(ClaimTypes.NameIdentifier) : "Claim not found";

                var hasUserNameClaim = User.HasClaim(c => c.Type == ClaimTypes.Name);
                var userName = hasUserNameClaim ? User.FindFirstValue(ClaimTypes.Name) : "Claim not found";

                var hasEmailClaim = User.HasClaim(c => c.Type == ClaimTypes.Email);
                var email = hasEmailClaim ? User.FindFirstValue(ClaimTypes.Email) : "Claim not found";

                EmailDTO sendEmail = new EmailDTO
                {
                    To = "taylor.paucek@ethereal.email",
                    Subject = "taylor.paucek@ethereal.email",
                    Body = "taylor.paucek@ethereal.email"
                };
                _mailService.SendEmail(sendEmail);
                return Ok(new
                {
                    UserId = userId,
                    UserName = userName,
                    Email = email
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = ex.Message, StackTrace = ex.StackTrace });
            }
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> CreateBioAsync([FromBody] BioDTO bioDTO)
        {
            try
            {
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                var email = User.FindFirstValue(ClaimTypes.Email);

                bioDTO.Email = email;
                await _accountRepo.CreateAsync(bioDTO, userId);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = ex.Message, StackTrace = ex.StackTrace });
            }
        }

        [Authorize]
        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            try
            {
                await _signInManager.SignOutAsync();
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = ex.Message, StackTrace = ex.StackTrace });
            }
        }

        [Authorize]
        [HttpPost("/api/employees/createemployee")]
        public async Task<IActionResult> CreateEmployee([FromBody] CreateEmployeeDTO employee)
        {
            try
            {
                var newEmployee = _mapper.Map<EmployeeDTO>(employee);



                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                await _accountRepo.CreateEmployeeAsync(newEmployee, userId);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = ex.Message, StackTrace = ex.StackTrace });
            }
        }

        [Authorize]
        [HttpGet("/api/employees/getallemployees")]
        public async Task<IActionResult> GetAllEmployees()
        {
            try
            {
                var hasUserIdClaim = User.HasClaim(c => c.Type == ClaimTypes.NameIdentifier);
                var userId = hasUserIdClaim ? User.FindFirstValue(ClaimTypes.NameIdentifier) : "Claim not found";

                var data = await _accountRepo.GetAllEmployeesAsync(userId);
                return Ok(data);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = ex.Message, StackTrace = ex.StackTrace });
            }
        }

        [Authorize]
        [HttpDelete("/api/employees/{id}")]
        public async Task<IActionResult> DeleteEmployeesAsync([FromRoute] int id)
        {
            try
            {
                var employee = await _accountRepo.DeleteEmployeeAsync(id);
                if (!employee)
                {
                    return NotFound();
                }
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = ex.Message, StackTrace = ex.StackTrace });
            }
        }

        [Authorize]
        [HttpPost("/api/changePassword")]
        public async Task<IActionResult> ChangePasswordAsync([FromBody] ChangePasswordDTO changePasswordDTO)
        {
            try
            {
                var user = await _userManager.GetUserAsync(User);
                var userPasswordIsValid = await _userManager.CheckPasswordAsync(user, changePasswordDTO.OldPassword);

                if (userPasswordIsValid)
                {
                    var result = await _userManager.ChangePasswordAsync(user, changePasswordDTO.OldPassword, changePasswordDTO.NewPassword);
                    if (result.Succeeded)
                    {
                        return Ok();
                    }
                    else
                    {
                        return BadRequest(new { message = "Failed to change password" });
                    }
                }
                else
                {
                    return BadRequest(new { message = "Invalid old password" });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = ex.Message, StackTrace = ex.StackTrace });
            }
        }

        [Authorize]
        [HttpPost("/api/deleteuser")]
        public async Task<IActionResult> DeleteUserAsync()
        {
            try
            {
                var user = User.FindFirstValue(ClaimTypes.NameIdentifier);
                var result = await _accountRepo.DeleteUser(user);
                if (!result)
                {
                    return BadRequest("Something went wrong");
                }
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = ex.Message, StackTrace = ex.StackTrace });
            }
        }

        [Authorize]
        [HttpGet("/api/getBio")]
        public async Task<IActionResult> GetBioAsync()
        {
            try
            {
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                var bio = await _accountRepo.GetBioAsync(userId);
                return Ok(bio);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = ex.Message, StackTrace = ex.StackTrace });
            }
        }

        [Authorize]
        [HttpPatch]
        public async Task<IActionResult> UpdateBioAsync([FromBody] BioDTO bioDTO)
        {
            try
            {
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                await _accountRepo.UpdateBioAsync(userId, bioDTO);
                return Ok(bioDTO);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = ex.Message, StackTrace = ex.StackTrace });
            }
        }

        [HttpPost("contact")]
        public async Task<IActionResult> ContactForm([FromBody] ContactUsEmailDTO contactUsEmail )
        {

            EmailBodies emailBodies = new EmailBodies();
            try
            {
                var confirm = emailBodies.ContactUsConfirmationEmail;
                var body = emailBodies.ContactUsEmailToApp;
                body.Replace("#NAME#", contactUsEmail.Name);
                body.Replace("#EMAIL#", contactUsEmail.Email);
                body.Replace("#QUESTION#", contactUsEmail.Message);
                EmailDTO emailAppDTO = new EmailDTO
                    {
                        To = "kitchenflowapp@gmail.com",
                        Subject = "Contact from " + contactUsEmail.Name,
                        Body = contactUsEmail.Message
                    };
                EmailDTO emailconfirmDTO = new EmailDTO
                    {
                        To = contactUsEmail.Email,
                        Subject = "Thanks for contacting us",
                        Body = confirm
                    };
                var result = await _accountRepo.SendEmailAsync(emailAppDTO);
                if (result)

                    return Ok(await _accountRepo.SendEmailAsync(emailconfirmDTO));
                else
                    return BadRequest("Email failed to be sent");
            } catch (Exception e)
            {
                Console.WriteLine(e.ToString());
                return BadRequest("Couldn't be sent");
            }
        }


        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserRegistrationRequestDTO requestDTO)
        {
            try
            {

                if (!ModelState.IsValid) return BadRequest(ModelState);

                var appUser = new AppUser
                {
                    UserName = requestDTO.Email,
                    Email = requestDTO.Email,
                    EmailConfirmed = false
                };

                var createdUser = await _accountRepo.RegisterUserAsync(appUser, requestDTO.Password);
                if (createdUser.Succeeded)
                {
                    var claims = new List<Claim>
                    {
                        new Claim("userId", appUser.Id),
                        new Claim("userName", appUser.UserName),
                        new Claim("email", appUser.Email)
                    };
                    await _accountRepo.AddClaimsAsync(appUser, claims);

                    var code = await _accountRepo.GenerateEmailConfirmationTokenAsync(appUser);

                    EmailBodies emailBodies = new EmailBodies();
                    string emailBody = emailBodies.RegisterEmail;
                    var domainName = Request.Scheme + "://" + "localhost:5158"; // var domainName = Request.Scheme + "://" + Request.Host;
                    var callbackUrl = $"{domainName}/api/Account/ConfirmEmail?userId={appUser.Id}&code={System.Net.WebUtility.UrlEncode(code)}";
                    var body = emailBody.Replace("#URL#", System.Text.Encodings.Web.HtmlEncoder.Default.Encode(callbackUrl));

                    EmailDTO emailDTO = new EmailDTO
                    {
                        To = appUser.Email,
                        Subject = "Confirm your email address by clicking the link",
                        Body = body
                    };

                    var result = await _accountRepo.SendEmailAsync(emailDTO);
                    NewUserDTO newUser = new NewUserDTO
                    {
                        UserName = appUser.UserName,
                        Email = appUser.Email,
                        Token = _tokenService.CreateToken(appUser) // Ensure CreateToken is awaited
                    };
                    if (result)
                        return Ok("Please verify your email address through the verification email: " + newUser.Email);
                    else
                        return BadRequest("Please request an email verification");
                }
                else
                {
                    return StatusCode(500, "An error occurred while creating the user.");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = ex.Message, StackTrace = ex.StackTrace });
            }
        }

        [HttpPost("resendconfirmationemail")]
        public async Task<IActionResult> ResendConfirmationEmail([FromBody] ResendConfirmationEmailDTO requestDTO)
        {
            try
            {
                var result = await _accountRepo.ResendConfirmationEmailAsync(requestDTO.Email, Request.Scheme, "localhost:5158");
                return result ? Ok("Verification email sent. Please check your email: " + requestDTO.Email) : BadRequest("Failed to send verification email. Please try again later.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = ex.Message, StackTrace = ex.StackTrace });
            }
        }

        [HttpGet("ConfirmEmail")]
        public async Task<IActionResult> ConfirmEmail(string userId, string code)
        {
            try
            {
                var result = await _accountRepo.ConfirmEmailAsync(userId, code, Request.Scheme, Request.Host.ToString());
                return result ? Content("Email confirmed successfully.", "text/html") : BadRequest("Invalid email confirmation URL");
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = ex.Message, StackTrace = ex.StackTrace });
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> LoginAsync(LoginDTO loginDTO)
        {
            try
            {
                var result = await _accountRepo.LoginAsync(loginDTO);
                return result != null ? Ok(result) : Unauthorized("Invalid email or password.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = ex.Message, StackTrace = ex.StackTrace });
            }
        }
    }
}
