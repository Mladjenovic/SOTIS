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
    public class TestsController : AbstractController
    {
        private readonly ITestRepository _testRepository;

        private readonly ISubjectRepository _subjectRepository;

        public TestsController(
            IOptions<AppSettings> appSettings,
            IMapper mapper,
            ITestRepository testRepository,
            ISubjectRepository subjectRepository)
            : base(appSettings, mapper)
        {
            _testRepository = testRepository;
            _subjectRepository = subjectRepository;
        }

        [HttpGet("get-all-professor/{subjectId}")]
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

        [HttpGet("get-single/{testId}")]
        [AuthorizationFilter(Role.Professor)]
        public IActionResult GetAll([FromRoute] string testId)
        {
            var test = _testRepository.GetSingleThenInclude(testId);
            if (test == null)
            {
                return BadRequest("Test with given id does not exists");
            }

            var result = Mapper.Map<TestDto>(test);
            return Ok(result);
        }

        [HttpPost("create")]
        [AuthorizationFilter(Role.Professor)]
        public IActionResult CreateTest([FromBody] TestCreateDto testCreateDto)
        {
            testCreateDto.Id = null;
            if (_testRepository.FindBy(x => x.Title == testCreateDto.Title).Any())
            {
                return BadRequest("Test with same title already exists");
            }

            var test = Mapper.Map<Test>(testCreateDto);
            var testDb = _testRepository.Add(test);
            _testRepository.Commit();

            var testDetails = _testRepository.GetSingleThenInclude(testDb.Id);
            var result = Mapper.Map<TestDto>(testDetails);
            return Ok(result);
        }

        [HttpPost("update")]
        [AuthorizationFilter(Role.Professor)]
        public IActionResult CreateTest([FromBody] TestDto testDto)
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

            _testRepository.Delete(testDb);
            _testRepository.Commit();

            var test = Mapper.Map<Test>(testDto);
            _testRepository.Add(test);
            _testRepository.Commit();

            return Ok();
        }

        [HttpDelete("delete/{testId}")]
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
    }
}
