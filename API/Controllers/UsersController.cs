using API.Dto;
using API.Dto.DtoResponse;
using API.Models;
using API.Repository.User;
using Microsoft.AspNetCore.Mvc;
using System.Net;

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

        public async Task<ActionResult> Register([FromBody] UserRegisterDto registerDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var isUniqueUser = _userRepo.isUniqueUser(registerDto.Username);

            if (!isUniqueUser)
            {
                ModelState.AddModelError("Username", "Username is already taken");
                return Conflict(ModelState);
            }

            try
            {
                var response = await _userRepo.Register(registerDto);

                if(response == null)
                {
                    return BadRequest();
                }

                return Ok();
            } catch (Exception ex)
            {
                ModelState.AddModelError("Password", ex.Message);
                return BadRequest(ModelState);
            }     
        }
    }
}
