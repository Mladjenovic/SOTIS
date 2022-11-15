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
    public class KnowledgeSpaceController : AbstractController
    {
        private readonly ISubjectRepository _subjectRepository;

        private readonly IProblemRepository _problemRepository;

        private readonly IKnowledgeSpacesRepository _knowledgeSpacesRepository;

        public KnowledgeSpaceController(
            IOptions<AppSettings> appSettings,
            IMapper mapper,
            ISubjectRepository subjectRepository,
            IProblemRepository problemRepository,
            IKnowledgeSpacesRepository knowledgeSpacesRepository)
            : base(appSettings, mapper)
        {
            _subjectRepository = subjectRepository;
            _problemRepository = problemRepository;
            _knowledgeSpacesRepository = knowledgeSpacesRepository;
        }

        [HttpPost]
        [AuthorizationFilter(Role.Professor)]
        public IActionResult CreateKnowledgeSpace([FromBody] KnowledgeSpaceDto knowledgeSpaceDto)
        {
            var subject = _subjectRepository.GetSingle(x => x.Id == knowledgeSpaceDto.SubjectId, x => x.KnowledgeSpaces);
            if (subject == null)
            {
                return BadRequest("Subject does not exist for given id");
            }

            if (subject.KnowledgeSpaces.Any(x => x.KnowledgeSpaceType == KnowledgeSpaceType.Expected))
            {
                return BadRequest("There is already expected knowledge space for given subject");
            }

            var nodeIdToProblemIdDict = new Dictionary<string, string>();
            var problems = new List<Problem>();
            var nodeDetails = new List<NodeDetails>();
            foreach (var node in knowledgeSpaceDto.Nodes)
            {
                var problem = _problemRepository.GetSingle(x => x.Name == node.Data.Label);
                if (problem == null)
                {
                    return BadRequest($"Problem with name {node.Data.Label} does not exist");
                }

                nodeIdToProblemIdDict[node.Id] = problem.Id;
                problems.Add(problem);
                var nodeDetail = Mapper.Map<NodeDetails>(node.Position);
                nodeDetail.ProblemId = problem.Id;
            }

            var surmises = new List<Surmise>();
            foreach(var edge in knowledgeSpaceDto.Edges)
            {
                surmises.Add(new Surmise
                {
                    SourceProblemId = nodeIdToProblemIdDict[edge.Source],
                    DestinationProblemId = nodeIdToProblemIdDict[edge.Target]
                });
            }

            var knowledgeSpace = new KnowledgeSpace
            {
                SubjectId = knowledgeSpaceDto.SubjectId,
                NodeDetails = nodeDetails,
                Surmises = surmises,
                KnowledgeSpaceType = KnowledgeSpaceType.Expected
            };

            _knowledgeSpacesRepository.Add(knowledgeSpace);
            _knowledgeSpacesRepository.Commit();

            return Ok(201);
        }

        [HttpGet("{subjectId}")]
        [AuthorizationFilter(Role.Professor)]
        public IActionResult GetKnowledgeSpace([FromRoute] string subjectId)
        {
            var subject = _subjectRepository.GetSingle(x => x.Id == subjectId, x => x.KnowledgeSpaces);
            if (subject == null)
            {
                return BadRequest("Subject does not exist for given id");
            }

            var knowledgeSpace = subject.KnowledgeSpaces.FirstOrDefault(x => x.KnowledgeSpaceType == KnowledgeSpaceType.Expected);
            if (knowledgeSpace == null)
            {
                return NoContent();
            }

            var response = new KnowledgeSpaceDto
            {
                //SubjectId = subject,
                //Nodes = 
            };
            return Ok(response);
        }
    }
}
