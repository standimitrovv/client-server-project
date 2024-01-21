using API.Dto;
using API.Dto.DtoResponse;

namespace API.Repository.User
{
    public interface IUserRepository
    {
        Task<LoginResponseDto> Login(UserLoginDto loginDto);

        Task<UserDto> Register(UserRegisterDto registerDto);

        bool isUniqueUser(string username);
    }
}
