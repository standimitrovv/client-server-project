using API.Dto;
using API.Dto.DtoResponse;
using API.Models;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace API.Repository.User
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _db;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IMapper _mapper;
        private string secretKey;

        public UserRepository(ApplicationDbContext db, IConfiguration config, UserManager<ApplicationUser> userManager, IMapper mapper)
        {
            _db = db;
            _userManager = userManager;
            _mapper = mapper;
            this.secretKey = config.GetValue<string>("ApiSettings:Secret");
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

        public async Task<LoginResponseDto> Login(UserLoginDto loginDto)
        {

            var user = await CheckUserLoginCredentials(loginDto);

            if(user == null)
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

        public Task<UserDto> Register(UserRegisterDto registerDto)
        {
            throw new NotImplementedException();
        }
    }
}
