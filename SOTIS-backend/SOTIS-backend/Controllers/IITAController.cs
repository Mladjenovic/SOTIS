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
using System.Net.Http;
using System.Threading.Tasks;

namespace SOTIS_backend.Controllers
{
    public class IITAController : AbstractController
    {
        private static readonly HttpClient _httpClient = new HttpClient();

        public IITAController(
            IOptions<AppSettings> appSettings,
            IMapper mapper)
            : base(appSettings, mapper)
        {
           
        }

        [HttpGet]
        [AuthorizationFilter(Role.Professor)]
        public IActionResult GetAll()
        {
            var result = Get("products");
            return Ok(result.Result);
        }

        public static async Task<string> Get(string queryString)
        {

            // The actual Get method
            using var result = await _httpClient.GetAsync($"http://127.0.0.1:7777/{queryString}");
            string content = await result.Content.ReadAsStringAsync();
            return content;
        }


    }
}
