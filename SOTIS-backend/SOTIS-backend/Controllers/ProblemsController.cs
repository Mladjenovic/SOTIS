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
    public class ProblemsController : AbstractController
    {
        private readonly IProblemRepository _problemRepository;

        private readonly ISubjectRepository _subjectRepository;

        public ProblemsController(
            IOptions<AppSettings> appSettings,
            IMapper mapper,
            IProblemRepository problemRepository,
            ISubjectRepository subjectRepository)
            : base(appSettings, mapper)
        {
            _problemRepository = problemRepository;
            _subjectRepository = subjectRepository;
        }

        [HttpGet("{subjectId}")]
        [AuthorizationFilter(Role.Professor)]
        public IActionResult GetAll([FromRoute] string subjectId)
        {
            if (_subjectRepository.GetSingle(subjectId) == null)
            {
                return BadRequest("Subject with given id does not exist");
            }

            var problems = _problemRepository.FindBy(x => x.SubjectId == subjectId);
            var result = Mapper.Map<IEnumerable<ProblemDto>>(problems);
            return Ok(result);
        }

        [HttpDelete("{problemId}")]
        [AuthorizationFilter(Role.Professor)]
        public IActionResult Delete([FromRoute] string problemId)
        {
            var problem = _problemRepository.FindByIncluding(x => x.Id == problemId, x => x.DestinationSurmises, x => x.SourceSurmises).FirstOrDefault();
            if (problem == null)
            {
                return BadRequest($"Problem with id {problemId} does not exist");
            }

            if (problem.SourceSurmises.Any() || problem.DestinationSurmises.Any())
            {
                return BadRequest("Cannot delete problem because it is already in use for some knowledge space");
            }
            // todo: prevent delete if some question is connected to this problem

            _problemRepository.Delete(problem);
            _problemRepository.Commit();
            return Ok();
        }

        [HttpPost]
        [AuthorizationFilter(Role.Professor)]
        public IActionResult Create([FromBody] ProblemCreateDto problemDto)
        {
            if (_subjectRepository.GetSingle(problemDto.SubjectId) == null)
            {
                return BadRequest($"Subject with id {problemDto.SubjectId} does not exist");
            }

            if (_problemRepository.GetSingle(x => x.Name == problemDto.Name && x.SubjectId == problemDto.SubjectId) != null)
            {
                return BadRequest($"Problem with subject id {problemDto.SubjectId} and name {problemDto.Name} already exists");
            }

            var problem = Mapper.Map<Problem>(problemDto);
            var problemDb = _problemRepository.Add(problem);
            _problemRepository.Commit();

            var result = Mapper.Map<ProblemDto>(problemDb);
            return Ok(result);
        }
    }
}
