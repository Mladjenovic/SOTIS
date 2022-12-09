using AutoMapper;
using CsvHelper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using SOTIS_backend.Common.Enums;
using SOTIS_backend.Common.Settings;
using SOTIS_backend.Controllers.Dtos;
using SOTIS_backend.Controllers.Helpers;
using SOTIS_backend.DataAccess.Interfaces;
using SOTIS_backend.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;

namespace SOTIS_backend.Controllers
{
    public class TestResultsController : AbstractController
    {
        private readonly ITestRepository _testRepository;

        private readonly ITestResultRepository _testResultRepository;

        public TestResultsController(
            IOptions<AppSettings> appSettings,
            IMapper mapper,
            ITestRepository testRepository,
            ITestResultRepository testResultRepository)
            : base(appSettings, mapper)
        {
            _testRepository = testRepository;
            _testResultRepository = testResultRepository;
        }

        [HttpPost]
        [AuthorizationFilter(Role.Student)]
        public IActionResult Create([FromBody] TestResultRequestDto testResultRequestDto)
        {
            var test = _testRepository.GetSingleThenIncludeAll(testResultRequestDto.TestId);
            if (test == null)
            {
                return BadRequest("Test with given id does not exists");
            }
            
            // todo: add validation if student is assigned to subject (which this test belongs)

            /*
            // add validation if student already took this test
            var sessionInfo = GetSession();
            if (_testResultRepository.FindBy(x => x.StudentId == sessionInfo.Id && x.TestId == testResultRequestDto.TestId).Any())
            {
                return BadRequest("Student already took this test");
            }
            */

            var totalPoints = 0.0;
            var correctlyAnsweredQuestions = new List<CorrectlyAnsweredQuestion>();
            var studentAnswerIds = testResultRequestDto.SelectedStudentAnswers.Select(x => x.Id).ToList();
            foreach (var section in test.Sections)
            {
                foreach (var question in section.Questions)
                {
                    var correctAnswerIds = question.ProfessorAnswers.Where(x => x.IsCorrect).Select(x => x.Id).ToList();
                    var incorrectAnswerIds = question.ProfessorAnswers.Where(x => !x.IsCorrect).Select(x => x.Id).ToList();

                    // student gets points per question if ALL correnct answers are selected
                    // and NONE of the incorrect answers are selected
                    if (correctAnswerIds.All(x => studentAnswerIds.Contains(x)) && 
                        !incorrectAnswerIds.Any(x => studentAnswerIds.Contains(x)))
                    {
                        totalPoints += question.PointsPerQuestion;
                        correctlyAnsweredQuestions.Add(new CorrectlyAnsweredQuestion
                        {
                            QuestionId = question.Id
                        });
                    }
                }
            }

            var testResult = _testResultRepository.Add(new TestResult
            {
                StudentId = GetSession().Id,
                TestId = testResultRequestDto.TestId,
                Points = totalPoints,
                DateTime = DateTime.UtcNow,
                CorrectlyAnsweredQuestions = correctlyAnsweredQuestions
            });
            _testResultRepository.Commit();

            return Ok(new { totalPoints = totalPoints });
        }

        [HttpGet("{testId}")]
        [AuthorizationFilter(Role.Professor)]
        public IActionResult GetAll([FromRoute] string testId)
        {
            var test = _testRepository.GetSingleThenIncludeAll(testId);
            if (test == null)
            {
                return BadRequest("Test with given id does not exists");
            }
            var testResults = Mapper.Map<IEnumerable<TestResultResponseDto>>(test.TestResults);

            var stream = new MemoryStream();
            using (var writeFile = new StreamWriter(stream, leaveOpen: true))
            {
                using (var csv = new CsvWriter(writeFile, CultureInfo.InvariantCulture, true))
                {
                    csv.WriteRecords(testResults);
                }
            }
            stream.Position = 0;
            return File(stream, "application/octet-stream", $"{test.Title}.csv");
        }
    }
}
