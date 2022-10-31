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

            CreateMap<SubjectLiteDto, Subject>();

            CreateMap<Subject, SubjectDto>().ReverseMap();

            CreateMap<Subject, SubjectFullDto>()
                .ForMember(dst => dst.Professor, src => src.Ignore())
                .ForMember(dst => dst.Students, src => src.Ignore());

            CreateMap<SubjectParticipantDto, SubjectParticipant>();
        }
    }
}
