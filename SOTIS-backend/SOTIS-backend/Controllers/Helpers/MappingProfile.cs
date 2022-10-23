using AutoMapper;
using SOTIS_backend.Common.Models;
using SOTIS_backend.Controllers.Dtos;
using SOTIS_backend.DataAccess.Models;

namespace SOTIS_backend.Controllers.Helpers
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<RegisterDto, User>();

            CreateMap<User, SessionInfo>();

            CreateMap<User, UserDto>();
        }
    }
}
