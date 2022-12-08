using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using SOTIS_backend.Common.Enums;
using SOTIS_backend.Common.Exceptions;
using SOTIS_backend.Common.Settings;
using SOTIS_backend.Common.Utilities;
using SOTIS_backend.Controllers.Dtos;
using SOTIS_backend.Controllers.Helpers;
using SOTIS_backend.DataAccess.Interfaces;
using SOTIS_backend.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SOTIS_backend.Controllers
{
    public class KnowledgeSpaceController : AbstractController
    {
        private readonly ISubjectRepository _subjectRepository;

        private readonly IProblemRepository _problemRepository;

        private readonly IKnowledgeSpacesRepository _knowledgeSpacesRepository;

        private readonly ITestResultRepository _testResultRepository;

        public KnowledgeSpaceController(
            IOptions<AppSettings> appSettings,
            IMapper mapper,
            ISubjectRepository subjectRepository,
            IProblemRepository problemRepository,
            IKnowledgeSpacesRepository knowledgeSpacesRepository,
            ITestResultRepository testResultRepository)
            : base(appSettings, mapper)
        {
            _subjectRepository = subjectRepository;
            _problemRepository = problemRepository;
            _knowledgeSpacesRepository = knowledgeSpacesRepository;
            _testResultRepository = testResultRepository;
        }

        [HttpPut("expected")]
        [AuthorizationFilter(Role.Professor)]
        public IActionResult CreateExpectedKnowledgeSpace([FromBody] KnowledgeSpaceDto knowledgeSpaceDto)
        {
            var subject = _subjectRepository.GetSingle(x => x.Id == knowledgeSpaceDto.SubjectId, x => x.KnowledgeSpaces);
            if (subject == null)
            {
                return BadRequest("Subject does not exist for given id");
            }

            PutKS(subject, knowledgeSpaceDto, KnowledgeSpaceType.Expected);

            return Ok();
        }

        [HttpGet("{subjectId}/expected")]
        [AuthorizationFilter(Role.Professor)]
        public IActionResult GetExpectedKnowledgeSpace([FromRoute] string subjectId)
        {
            var subject = _subjectRepository.GetSingle(x => x.Id == subjectId, x => x.KnowledgeSpaces);
            if (subject == null)
            {
                return BadRequest("Subject does not exist for given id");
            }

            var knowledgeSpace = subject.KnowledgeSpaces.FirstOrDefault(x => x.KnowledgeSpaceType == KnowledgeSpaceType.Expected);
            if (knowledgeSpace == null)
            {
                return Ok(new KnowledgeSpaceDto());
            }

            knowledgeSpace = _knowledgeSpacesRepository.GetSingle(x => x.Id == knowledgeSpace.Id, x => x.Surmises, x => x.NodeDetails); // retrieve dependent entities
            var response = CreateKSdto(knowledgeSpace);

            return Ok(response);
        }

        [HttpGet("{subjectId}/real")]
        [AuthorizationFilter(Role.Professor)]
        public IActionResult GetRealKnowledgeSpace([FromRoute] string subjectId)
        {
            var subject = _subjectRepository.GetSingle(x => x.Id == subjectId, x => x.KnowledgeSpaces);
            if (subject == null)
            {
                return BadRequest("Subject does not exist for given id");
            }

            var knowledgeSpace = subject.KnowledgeSpaces.FirstOrDefault(x => x.KnowledgeSpaceType == KnowledgeSpaceType.Real);
            if (knowledgeSpace == null)
            {
                return Ok(new KnowledgeSpaceDto());
            }

            knowledgeSpace = _knowledgeSpacesRepository.GetSingle(x => x.Id == knowledgeSpace.Id, x => x.Surmises, x => x.NodeDetails); // retrieve dependent entities
            var response = CreateKSdto(knowledgeSpace);

            return Ok(response);
        }

        [HttpPut("{subjectId}/real")]
        [AuthorizationFilter(Role.Professor)]
        public async Task<IActionResult> CrateRealKnowledgeSpace([FromRoute] string subjectId)
        {
            var subject = _subjectRepository.GetSingle(x => x.Id == subjectId, x => x.KnowledgeSpaces);
            if (subject == null)
            {
                return BadRequest("Subject does not exist for given id");
            }

            var expectedKnowledgeSpace = subject.KnowledgeSpaces.FirstOrDefault(x => x.KnowledgeSpaceType == KnowledgeSpaceType.Expected);
            if (expectedKnowledgeSpace == null)
            {
                return BadRequest($"You should create expected knowledge space for subject with id: {subjectId} before creating real knowledge space");
            }

            var iitaEntries = PrepareDataForIita(subjectId);

            var iitaResponse = await HttpHelper.PostAsync<IitaResponse>(AppSettings.IitaUrl, iitaEntries);

            var knowledgeSpaceDto = PrepareRealKS(subjectId, expectedKnowledgeSpace, iitaEntries, iitaResponse);
            PutKS(subject, knowledgeSpaceDto, KnowledgeSpaceType.Real);

            return Ok(201);
        }

        private KnowledgeSpaceDto PrepareRealKS(string subjectId, KnowledgeSpace expectedKnowledgeSpace, Dictionary<string, List<int>> iitaEntries, IitaResponse response)
        {
            var expectedKnowledgeSpaceWithDependencies = _knowledgeSpacesRepository.GetSingle(x => x.Id == expectedKnowledgeSpace.Id, x => x.Surmises, x => x.NodeDetails); // retrieve dependent entities
            var expectedKnowledgeSpaceDto = CreateKSdto(expectedKnowledgeSpaceWithDependencies);
            var counter = 0;
            var problemIndexToId = iitaEntries.Keys.ToList().ToDictionary(x => counter++, x => x);
            var edges = response.Implications.Select(x => new EdgeDto
            {
                Source = problemIndexToId[x.First()],
                Target = problemIndexToId[x.Last()],
            });

            var knowledgeSpaceDto = new KnowledgeSpaceDto
            {
                SubjectId = subjectId,
                Nodes = expectedKnowledgeSpaceDto.Nodes, // same coordinates as for expected knowledge space
                Edges = edges.ToList()
            };
            return knowledgeSpaceDto;
        }

        private Dictionary<string, List<int>> PrepareDataForIita(string subjectId)
        {
            /*
              ita_entries = pd.DataFrame({
                'p0': [1, 1, 1, 1, 1, 1, 1, 0],
                'p1': [1, 1, 1, 1, 0, 0, 0, 0],
                'p2': [1, 1, 0, 0, 0, 0, 0, 0],
                'p3': [0, 0, 1, 1, 0, 0, 0, 0]
                })
            */

            var testResults = _testResultRepository.FindByIncluding(x => x.Test.SubjectId == subjectId, x => x.Test, x => x.CorrectlyAnsweredQuestions);
            // if you are retrieving problems in this way, then questions from test must cover all problems.
            // another way to retieve problems for test is to retrieve problems from questions which are present in the test.
            var problems = _problemRepository.FindByIncluding(x => x.SubjectId == subjectId, x => x.Questions);

            var problemIdToQuestionIds = problems.Select(x => new { ProblemId = x.Id, QuestionIds = x.Questions.Select(x => x.Id) });
            var iitaEntries = problems.ToDictionary(x => x.Id, x => new List<int>());

            foreach (var testResult in testResults)
            {
                var correctQuestionIds = testResult.CorrectlyAnsweredQuestions.Select(x => x.QuestionId);

                foreach (var item in problemIdToQuestionIds)
                {
                    if (item.QuestionIds.All(x => correctQuestionIds.Contains(x)))
                    {
                        // student knows problem only if he/she knows all questions related to that problem
                        iitaEntries[item.ProblemId].Add(1);
                    }
                    else
                    {
                        iitaEntries[item.ProblemId].Add(0);
                    }
                }
            }

            return iitaEntries;
        }

        private void PutKS(Subject subject, KnowledgeSpaceDto knowledgeSpaceDto, KnowledgeSpaceType knowledgeSpaceType)
        {
            var nodeIdToProblemIdDict = new Dictionary<string, string>();
            var problems = new List<Problem>();
            var nodeDetails = new List<NodeDetails>();
            foreach (var node in knowledgeSpaceDto.Nodes)
            {
                var problem = _problemRepository.GetSingle(x => x.Name == node.Data.Label);
                if (problem == null)
                {
                    throw new ValidationException($"Problem with name {node.Data.Label} does not exist");
                }

                nodeIdToProblemIdDict[node.Id] = problem.Id;
                problems.Add(problem);
                var nodeDetail = Mapper.Map<NodeDetails>(node.Position);
                nodeDetail.ProblemId = problem.Id;
                nodeDetails.Add(nodeDetail);
            }

            var surmises = new List<Surmise>();
            foreach (var edge in knowledgeSpaceDto.Edges)
            {
                surmises.Add(new Surmise
                {
                    SourceProblemId = nodeIdToProblemIdDict[edge.Source],
                    DestinationProblemId = nodeIdToProblemIdDict[edge.Target]
                });
            }

            var newKnowledgeSpace = new KnowledgeSpace
            {
                SubjectId = knowledgeSpaceDto.SubjectId,
                NodeDetails = nodeDetails,
                Surmises = surmises,
                KnowledgeSpaceType = knowledgeSpaceType
            };

            var oldKnowledgeSpace = subject.KnowledgeSpaces.FirstOrDefault(x => x.KnowledgeSpaceType == knowledgeSpaceType);
            if (oldKnowledgeSpace != null)
            {
                _knowledgeSpacesRepository.Delete(oldKnowledgeSpace);
                _knowledgeSpacesRepository.Commit();
            }

            _knowledgeSpacesRepository.Add(newKnowledgeSpace);
            _knowledgeSpacesRepository.Commit();
        }

        private KnowledgeSpaceDto CreateKSdto(KnowledgeSpace knowledgeSpace)
        {
            var nodes = new List<NodeDto>();
            foreach (var nodeDetail in knowledgeSpace.NodeDetails)
            {
                var problem = _problemRepository.GetSingle(nodeDetail.ProblemId);
                nodes.Add(new NodeDto
                {
                    Id = nodeDetail.ProblemId,
                    Data = new DataDto
                    {
                        Label = problem.Name
                    },
                    Position = new PositionDto
                    {
                        X = nodeDetail.CoordinateX,
                        Y = nodeDetail.CoordinateY
                    }
                });
            }

            var response = new KnowledgeSpaceDto
            {
                SubjectId = knowledgeSpace.SubjectId,
                Nodes = nodes,
                Edges = knowledgeSpace.Surmises.Select(x =>
                    new EdgeDto
                    {
                        Id = x.Id,
                        Source = x.SourceProblemId,
                        Target = x.DestinationProblemId
                    }).ToList()
            };
            return response;
        }
    }
}
