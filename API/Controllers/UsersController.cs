using API.Dto;
using API.Dto.DtoResponse;
using API.Repository.User;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("/api/users")]
    public class UsersController : ControllerBase
    {
        private readonly IUserRepository _userRepo;
        public UsersController(IUserRepository userRepo)
        {
            _userRepo = userRepo;  
        }

        [HttpPost("login")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<LoginResponseDto>> Login([FromBody] UserLoginDto loginDto)
        {
            var response = await _userRepo.Login(loginDto);

            if(response.User == null || string.IsNullOrEmpty(response.Token))
            {
                return BadRequest(response);
            }

            return Ok(response);
        }

        [HttpPost("register")]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status200OK)]

        public async Task<ActionResult<UserDto>> Register([FromBody] UserRegisterDto registerDto)
        {
            var isUniqueUser = _userRepo.isUniqueUser(registerDto.Username);

            if(!isUniqueUser)
            {
                return Conflict(registerDto);
            }

            var user = await _userRepo.Register(registerDto);

            if(user == null)
            {
                return BadRequest(user);
            }

            return Ok(user);
        }
    }
}
