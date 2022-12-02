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

            CreateMap<Test, TestBaseDto>().ReverseMap();
            CreateMap<Test, TestCreateDto>().ReverseMap();
            CreateMap<Test, TestDto>().ReverseMap();
            CreateMap<Section, SectionBaseDto>().ReverseMap();
            CreateMap<Section, SectionCreateDto>().ReverseMap();
            CreateMap<Section, SectionDto>().ReverseMap();
            CreateMap<Question, QuestionBaseDto>().ReverseMap();
            CreateMap<Question, QuestionCreateDto>().ReverseMap();
            CreateMap<Question, QuestionDto>().ReverseMap();
            CreateMap<ProfessorAnswer, ProfessorAnswerBaseDto>().ReverseMap();
            CreateMap<ProfessorAnswer, ProfessorAnswerDto>().ReverseMap();
            
            CreateMap<Problem, ProblemDto>().ReverseMap();
            CreateMap<Problem, ProblemCreateDto>().ReverseMap();
            CreateMap<PositionDto, NodeDetails>()
                .ForMember(dst => dst.CoordinateX, map => map.MapFrom(src => src.X))
                .ForMember(dst => dst.CoordinateY, map => map.MapFrom(src => src.Y))
                .ReverseMap();

            CreateMap<TestResult, TestResultResponseDto>()
                .ForMember(dst => dst.StudentName, map => map.MapFrom(src => src.Student.Name))
                .ForMember(dst => dst.StudentSurname, map => map.MapFrom(src => src.Student.Surname))
                .ForMember(dst => dst.StudentUsername, map => map.MapFrom(src => src.Student.Username));
        }
    }
}
