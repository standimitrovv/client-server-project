using API.Dto;
using API.Models;
using AutoMapper;

namespace API
{
    public class MappingConfig : Profile
    {
        public MappingConfig() 
        {
            CreateMap<ApplicationUser, UserDto>().ReverseMap();
            CreateMap<Comment, CommentDto>().ReverseMap();
        }
    }
}
