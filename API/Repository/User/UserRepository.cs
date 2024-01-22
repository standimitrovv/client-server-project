using API.Dto;
using API.Dto.DtoResponse;
using API.Models;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using System.Text;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace API.Repository.User
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _db;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IMapper _mapper;
        private string secretKey;
        private readonly APIResponse<UserDto> _apiRes;

        public UserRepository(ApplicationDbContext db, IConfiguration config, UserManager<ApplicationUser> userManager, IMapper mapper)
        {
            _db = db;
            _userManager = userManager;
            _mapper = mapper;
            this.secretKey = config.GetValue<string>("ApiSettings:Secret");
            this._apiRes = new();
        }

        private async Task<UserDto> CheckUserLoginCredentials(UserLoginDto loginDto)
        {
            var user = await _db.Users.FirstOrDefaultAsync(u => u.UserName.ToLower() == loginDto.Username.ToLower());

            if (user == null)
            {
                return new UserDto();
            }

            // check password
            bool isPasswordValid = await _userManager.CheckPasswordAsync(user, loginDto.Password);

            if (!isPasswordValid)
            {
                return new UserDto();
            }

            return _mapper.Map<UserDto>(user);

        }

        public bool isUniqueUser(string username)
        {
            var user = _db.Users.FirstOrDefault(u => u.UserName == username);

            return user == null ? true : false;
        }

        public async Task<LoginResponseDto> Login(UserLoginDto loginDto)
        {

            var user = await CheckUserLoginCredentials(loginDto);

            if(user.Id == null)
            {
                return new LoginResponseDto()
                {
                    Token = "",
                    User = user
                };
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(secretKey);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString()),
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return new LoginResponseDto()
            {
                Token = tokenHandler.WriteToken(token),
                User = user,
            };
        }

        public async Task<APIResponse<UserDto>> Register(UserRegisterDto registerDto)
        {
            var user = new ApplicationUser()
            {
                UserName = registerDto.Username,
                Email = registerDto.Email,
                NormalizedEmail = registerDto.Email.ToUpper(),
                Name = registerDto.Username.ToLower()
            };

            try
            {
                var result = await _userManager.CreateAsync(user, registerDto.Password);

                if (result.Errors.Count() > 0) 
                {
                    _apiRes.ErrorMessages = result.Errors.Select(e => e.Description).ToList();
                    _apiRes.StatusCode = HttpStatusCode.BadRequest;
                    _apiRes.Result = null;

                    return _apiRes;
                }
                var userToReturn = _db.Users.FirstOrDefault(u => u.UserName == registerDto.Username);

                _apiRes.StatusCode = HttpStatusCode.OK;
                _apiRes.Result = _mapper.Map<UserDto>(userToReturn);
                return _apiRes;

            } catch (Exception ex)
            {
                _apiRes.StatusCode = HttpStatusCode.BadRequest;
                _apiRes.ErrorMessages = new List<string>() { ex.Message };
                _apiRes.Result = null;
                return _apiRes;
            }
        }
    }
}
