using API.Dto;
using API.Dto.DtoResponse;

namespace API.Repository.User
{
    public class UserRepository : IUserRepository
    {
        public Task<LoginResponseDto> Login(UserLoginDto loginDto)
        {
            throw new NotImplementedException();
        }

        public Task<UserDto> Register(UserRegisterDto registerDto)
        {
            throw new NotImplementedException();
        }
    }
}
