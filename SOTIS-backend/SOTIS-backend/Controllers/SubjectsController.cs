using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using SOTIS_backend.Common.Enums;
using SOTIS_backend.Common.Settings;
using SOTIS_backend.Controllers.Dtos;
using SOTIS_backend.Controllers.Helpers;
using SOTIS_backend.DataAccess.Interfaces;
using SOTIS_backend.DataAccess.Models;
using System.Collections.Generic;
using System.Linq;

namespace SOTIS_backend.Controllers
{
    public class SubjectsController : AbstractController
    {
        private readonly ISubjectRepository _subjectRepository;

        private readonly ISubjectParticipantRepository _subjectParticipantRepository;

        private readonly IUsersRepository _usersRepository;

        public SubjectsController(
            IOptions<AppSettings> appSettings,
            IMapper mapper,
            ISubjectRepository subjectRepository,
            ISubjectParticipantRepository subjectParticipantRepository,
            IUsersRepository usersRepository)
            : base(appSettings, mapper)
        {
            _subjectRepository = subjectRepository;
            _subjectParticipantRepository = subjectParticipantRepository;
            _usersRepository = usersRepository;
        }

        [HttpGet]
        [AuthorizationFilter(Role.Admin)]
        public IActionResult GetAll()
        {
            var subjects = _subjectRepository.GetAll();
            var result = Mapper.Map<List<SubjectDto>>(subjects);
            return Ok(result);
        }

        [HttpGet("{subjectId}")]
        [AuthorizationFilter(Role.Admin)]
        public IActionResult GetDetails([FromRoute] string subjectId)
        {
            var subject = _subjectRepository.GetSingle(x => x.Id == subjectId, x => x.Students, x => x.Professor);
            if (subject == null)
            {
                return BadRequest("Subject with given id does not exists");
            }

            var students = new List<User>();
            foreach (var participant in subject.Students)
            {
                var student = _usersRepository.GetSingle(x => x.Id == participant.UserId);
                students.Add(student);
            }
            var result = Mapper.Map<SubjectFullDto>(subject);
            result.Professor = Mapper.Map<UserDto>(subject.Professor);
            result.Students = Mapper.Map<List<UserDto>>(students);

            return Ok(result);
        }

        [HttpPost("{professorId}")]
        [AuthorizationFilter(Role.Admin)]
        public IActionResult Create([FromBody] SubjectLiteDto subjectDto, [FromRoute] string professorId)
        {
            var professor = _usersRepository.GetSingle(professorId);
            if (professor == null)
            {
                return BadRequest("Professor with given id does not exists");
            }

            var subject = Mapper.Map<Subject>(subjectDto);
            subject.Professor = professor;

            var subjectDb = _subjectRepository.Add(subject);
            _subjectRepository.Commit();

            var result = Mapper.Map<SubjectDto>(subjectDb);
            return Ok(result);
        }

        [HttpDelete("{subjectId}")]
        [AuthorizationFilter(Role.Admin)]
        public IActionResult Delete([FromRoute] string subjectId)
        {
            var subject = _subjectRepository.GetSingle(x => x.Id == subjectId, x => x.Tests);
            if (subject == null)
            {
                return BadRequest("Subject with given id does not exists");
            }

            if (subject.Tests.Any())
            {
                return BadRequest("Connot delete subject if it contains tests");
            }

            var subjectParticipants = _subjectParticipantRepository.FindBy(x => x.SubjectId == subjectId);
            if (subjectParticipants.Any())
            {
                return BadRequest("Cannot delete subject if it contains participants");
            }

            _subjectRepository.Delete(subject);
            _subjectRepository.Commit();
            return Ok();
        }

        [HttpGet("professor")]
        [AuthorizationFilter(Role.Professor)]
        public IActionResult GetForProfessor()
        {
            var sessionInfo = GetSession();
            var subjects = _subjectRepository.FindByIncluding(x => x.Professor.Id == sessionInfo.Id, x => x.Professor);
            var result = Mapper.Map<IEnumerable<SubjectDto>>(subjects);
            return Ok(result);
        }

        [HttpGet("student")]
        [AuthorizationFilter(Role.Student)]
        public IActionResult GetForStudent()
        {
            var sessionInfo = GetSession();
            var subjectParticipants = _subjectParticipantRepository.FindByIncluding(x => x.UserId == sessionInfo.Id, x => x.Subject);
            var subjects = subjectParticipants.Select(x => x.Subject);
            var result = Mapper.Map<IEnumerable<SubjectDto>>(subjects);
            return Ok(result);
        }

        [HttpPost("student")]
        [AuthorizationFilter(Role.Admin)]
        public IActionResult AddStudent([FromBody] SubjectParticipantDto subjectParticipantDto)
        {
            var item = _subjectParticipantRepository.GetSingle(x => x.SubjectId == subjectParticipantDto.SubjectId && x.UserId == subjectParticipantDto.UserId);
            if (item != null)
            {
                return BadRequest("Student is already added to subject");
            }

            var subjectParticipant = Mapper.Map<SubjectParticipant>(subjectParticipantDto);
            _subjectParticipantRepository.Add(subjectParticipant);
            _subjectParticipantRepository.Commit();
            return Ok();
        }

        [HttpDelete("student")]
        [AuthorizationFilter(Role.Admin)]
        public IActionResult RemoveStudent([FromBody] SubjectParticipantDto subjectParticipantDto)
        {
            var item = _subjectParticipantRepository.GetSingle(x => x.SubjectId == subjectParticipantDto.SubjectId && x.UserId == subjectParticipantDto.UserId);
            if (item == null)
            {
                return BadRequest("Either subject or student with given id does not exist");
            }

            _subjectParticipantRepository.Delete(item);
            _subjectParticipantRepository.Commit();
            return Ok();
        }
    }
}
