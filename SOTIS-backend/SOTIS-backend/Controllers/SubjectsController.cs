using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using SOTIS_backend.Common.Settings;
using SOTIS_backend.DataAccess.Interfaces;
using System.Net.Http;
using System.Threading.Tasks;

namespace SOTIS_backend.Controllers
{
    public class SubjectsController : AbstractController
    {

        private static readonly HttpClient _httpClient = new();

        public SubjectsController(
            IOptions<AppSettings> appSettings,
            IMapper mapper,
            ISubjectRepository subjectRepository,
            ISubjectParticipantRepository subjectParticipantRepository,
            IUsersRepository usersRepository)
            : base(appSettings, mapper)
        {

        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var result =  Get();
            return Ok(result);
        }

        public static async Task<string> Get()
        {
            string url = "http://127.0.0.1:5000/products";
            // The actual Get method
            using var result = await _httpClient.GetAsync($"{url}");
            string content = await result.Content.ReadAsStringAsync();
            return content;
        }
    }
}
