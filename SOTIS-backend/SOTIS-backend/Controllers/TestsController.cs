using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using SOTIS_backend.Common.Enums;
using SOTIS_backend.Common.Exceptions;
using SOTIS_backend.Common.Settings;
using SOTIS_backend.Common.Utilities;
using SOTIS_backend.Controllers.Dtos;
using SOTIS_backend.Controllers.Dtos.Test.GuidedTesting;
using SOTIS_backend.Controllers.Helpers;
using SOTIS_backend.DataAccess.Interfaces;
using SOTIS_backend.DataAccess.Models;
using SOTIS_backend.DataAccess.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SOTIS_backend.Controllers
{
    public class TestsController : AbstractController
    {
        private readonly ITestRepository _testRepository;

        private readonly ISubjectRepository _subjectRepository;

        private readonly IProblemRepository _problemRepository;

        private readonly IKnowledgeSpacesRepository _knowledgeSpacesRepository;

        public TestsController(
            IOptions<AppSettings> appSettings,
            IMapper mapper,
            ITestRepository testRepository,
            ISubjectRepository subjectRepository,
            IProblemRepository problemRepository,
            IKnowledgeSpacesRepository knowledgeSpacesRepository)
            : base(appSettings, mapper)
        {
            _testRepository = testRepository;
            _subjectRepository = subjectRepository;
            _problemRepository = problemRepository;
            _knowledgeSpacesRepository = knowledgeSpacesRepository;
        }

        [HttpGet("professor/{subjectId}")]
        [AuthorizationFilter(Role.Professor)]
        public IActionResult GetAllProfessor([FromRoute] string subjectId)
        {
            if (_subjectRepository.GetSingle(subjectId) == null)
            {
                return BadRequest("Subject does not exist for given id");
            }

            var tests = _testRepository.FindBy(x => x.SubjectId == subjectId);
            var result = Mapper.Map<IEnumerable<TestBaseDto>>(tests);
            return Ok(result);
        }

        [HttpGet("student/{subjectId}")]
        [AuthorizationFilter(Role.Student)]
        public IActionResult GetAllStudent([FromRoute] string subjectId)
        {
            if (_subjectRepository.GetSingle(subjectId) == null)
            {
                return BadRequest("Subject does not exist for given id");
            }

            var tests = _testRepository.FindBy(x => x.SubjectId == subjectId);
            var result = Mapper.Map<IEnumerable<TestBaseDto>>(tests);
            return Ok(result);
        }

        [HttpGet("{testId}")]
        [AuthorizationFilter(Role.Professor, Role.Student)]
        public IActionResult GetAll([FromRoute] string testId)
        {
            var test = _testRepository.GetSingleThenIncludeAll(testId);
            if (test == null)
            {
                return BadRequest("Test with given id does not exists");
            }

            var result = Mapper.Map<TestDto>(test);
            return Ok(result);
        }

        [HttpPost("/guidedTest/{testId}")]
        [AuthorizationFilter(Role.Professor, Role.Student)]
        public async Task<IActionResult> CalculateNextQuestionAsync([FromRoute] string testId, [FromBody] GuidedTestingFrontendRequestDto frontendRequestDto)
        {
            var test = _testRepository.GetSingleThenIncludeAll(testId);
            if (test == null)
            {
                return BadRequest("Test with given id does not exists");
            }

            GuidedTestingPythonRequestDto pythonRequestDto;
            if (frontendRequestDto.KnowledgeStates == null) 
            {
                // need to retrieve first question
                pythonRequestDto = new GuidedTestingPythonRequestDto
                {
                    KnowledgeStates = GetInitialKnowledgeStates(test.SubjectId)
                };
            }
            else
            {
                pythonRequestDto = new GuidedTestingPythonRequestDto
                {
                    KnowledgeStates = frontendRequestDto.KnowledgeStates,
                    ProblemId = frontendRequestDto.Question.ProblemId,
                    IsAnswerCorrect = CalculateIsAnswerCorrect(frontendRequestDto),
                    Threshold = AppSettings.StochasticMarkovThreshold
                };
            }

            var pythonResponseDto = await HttpHelper.PostAsync<GuidedTestingPythonResponseDto>(AppSettings.StochasticMarkovUrl, pythonRequestDto);

            var testDto = Mapper.Map<TestDto>(test);
            var frontendResponseDto = new GuidedTestingFrontendResponseDto
            {
                KnowledgeStates = pythonResponseDto.KnowledgeStates,
                IsFinalStateReached = pythonResponseDto.IsFinalStateReached,
                Question = pythonResponseDto.IsFinalStateReached ? null : GetNextQuestion(testDto, pythonResponseDto.ProblemId)
            };
            // todo: store knowledge state in database for that student
            return Ok(frontendResponseDto);
        }

        [HttpPost]
        [AuthorizationFilter(Role.Professor)]
        public IActionResult CreateTest([FromBody] TestCreateDto testCreateDto)
        {
            testCreateDto.Id = null;
            if (_testRepository.FindBy(x => x.Title == testCreateDto.Title).Any())
            {
                return BadRequest("Test with same title already exists");
            }

            var problemIds = testCreateDto.Sections.SelectMany(x => x.Questions).Select(x => x.ProblemId);
            if (problemIds.Any(x => x == null))
            {
                return BadRequest("Every question must be connected with one problem");
            }

            foreach (var problemId in problemIds)
            {
                if (_problemRepository.GetSingle(problemId) == null)
                {
                    return BadRequest($"Problem with id {problemId} does not exist");
                }
            }

            var test = Mapper.Map<Test>(testCreateDto);
            var testDb = _testRepository.Add(test);
            _testRepository.Commit();

            var testDetails = _testRepository.GetSingleThenIncludeAll(testDb.Id);
            var result = Mapper.Map<TestDto>(testDetails);
            return Ok(result);
        }

        [HttpPut]
        [AuthorizationFilter(Role.Professor)]
        public IActionResult UpdateTest([FromBody] TestDto testDto)
        {
            // TODO: prevent test update if some student already took the test
            var testDb = _testRepository.GetSingle(testDto.Id);
            if (testDb == null)
            {
                return BadRequest("Test with given id does not exist");
            }

            if (_testRepository.FindBy(x => x.Title == testDto.Title).Any(x => x.Id != testDto.Id))
            {
                return BadRequest("Test with same title already exists");
            }

            var problemIds = testDto.Sections.SelectMany(x => x.Questions).Select(x => x.ProblemId);
            if (problemIds.Any(x => x == null))
            {
                return BadRequest("Every question must be connected with one problem");
            }

            foreach (var problemId in problemIds)
            {
                if (_problemRepository.GetSingle(problemId) == null)
                {
                    return BadRequest($"Problem with id {problemId} does not exist");
                }
            }

            _testRepository.Delete(testDb);
            _testRepository.Commit();

            var test = Mapper.Map<Test>(testDto);
            _testRepository.Add(test);
            _testRepository.Commit();

            return Ok();
        }

        [HttpDelete("{testId}")]
        [AuthorizationFilter(Role.Professor)]
        public IActionResult DeleteTest([FromRoute] string testId)
        {
            // TODO: prevent test deletion if some student already took the test
            var test = _testRepository.GetSingle(testId);
            if (test == null)
            {
                return BadRequest("Test with given id does not exist");
            }

            _testRepository.Delete(test);
            _testRepository.Commit();

            return Ok();
        }

        private QuestionDto GetNextQuestion(TestDto test, string problemId)
        {
            var questions = test.Sections
                                .SelectMany(x => x.Questions)
                                .Where(x => x.ProblemId == problemId)
                                .ToList();

            var rnd = new Random();
            int randIndex = rnd.Next(questions.Count);
            return questions[randIndex];
        }

        private static bool CalculateIsAnswerCorrect(GuidedTestingFrontendRequestDto frontendRequestDto)
        {
            var correctAnswerIds = frontendRequestDto.Question.ProfessorAnswers.Where(x => x.IsCorrect).Select(x => x.Id).ToList();
            var incorrectAnswerIds = frontendRequestDto.Question.ProfessorAnswers.Where(x => !x.IsCorrect).Select(x => x.Id).ToList();

            // answer is correct if ALL correct answers are selected
            // and NONE of the incorrect answers are selected
            return correctAnswerIds.All(x => frontendRequestDto.StudentAnswerIds.Contains(x)) &&
                !incorrectAnswerIds.Any(x => frontendRequestDto.StudentAnswerIds.Contains(x));
        }

        private IEnumerable<KnowledgeState> GetInitialKnowledgeStates(string subjectId)
        {
            var knowledgeSpace = _knowledgeSpacesRepository
                                        .FindByIncluding(x => x.SubjectId == subjectId, x => x.Surmises)
                                        .FirstOrDefault(x => x.KnowledgeSpaceType == KnowledgeSpaceType.Expected);
            if (knowledgeSpace == null)
            {
                throw new ValidationException($"Expected knowledge space does not exists for subjectid: {subjectId}");
            }
            var validSurmiseIds = knowledgeSpace.Surmises.Select(x => x.Id);

            var knowledgeStates = new List<KnowledgeState>();
            var problems = _problemRepository.FindByIncluding(x => x.SubjectId == subjectId, x => x.SourceSurmises, x => x.DestinationSurmises);
            foreach (var problem in problems)
            {
                var problemsIds = new List<string>() { problem.Id };
                var oldtempProblemIds = new List<string>() { problem.Id };
                var newTempProblemIds = new List<string>();
                while (true)
                {
                    foreach (var problemId in oldtempProblemIds)
                    {
                        var tempProblem = problems.First(x => x.Id == problemId);
                        var validSurmises = tempProblem.DestinationSurmises.Where(x => validSurmiseIds.Contains(x.Id));
                        foreach (var surmise in validSurmises)
                        {
                            problemsIds.Add(surmise.SourceProblemId);
                            newTempProblemIds.Add(surmise.SourceProblemId);
                        }
                    }
                    if (newTempProblemIds.Count == 0)
                    {
                        break;
                    }
                    else
                    {
                        oldtempProblemIds = newTempProblemIds;
                        newTempProblemIds = new List<string>();
                    }
                }
                knowledgeStates.Add(new KnowledgeState
                {
                    ProblemIds = problemsIds.Distinct(),
                    Probability = 1
                });
            }
            return knowledgeStates;
        }
    }
}
