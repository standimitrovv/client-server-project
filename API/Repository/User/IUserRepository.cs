using API.Dto;
using API.Dto.DtoResponse;
using API.Models;

namespace API.Repository.User
{
    public interface IUserRepository
    {
        Task<LoginResponseDto> Login(UserLoginDto loginDto);

        Task<APIResponse<UserDto>> Register(UserRegisterDto registerDto);

        bool isUniqueUser(string username);
    }
}
