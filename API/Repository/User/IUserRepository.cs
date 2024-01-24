using API.Dto;
using API.Dto.DtoResponse;
using API.Models;

namespace API.Repository.User
{
    public interface IUserRepository
    {
        Task<LoginResponseDto> Login(UserLoginDto loginDto);

        Task<UserDto> Register(UserRegisterDto registerDto);

        Task<UserDto> FindUserById(string id);

        bool isUniqueUser(string username);
    }
}
