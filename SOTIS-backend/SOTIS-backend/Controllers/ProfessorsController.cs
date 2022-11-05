using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using SOTIS_backend.Common.Enums;
using SOTIS_backend.Common.Settings;
using SOTIS_backend.Controllers.Dtos;
using SOTIS_backend.Controllers.Helpers;
using SOTIS_backend.DataAccess.Interfaces;
using System.Collections.Generic;

namespace SOTIS_backend.Controllers
{
    public class ProfessorsController : AbstractController
    {
        private readonly IUsersRepository _usersRepository;

        public ProfessorsController(
            IOptions<AppSettings> appSettings,
            IMapper mapper,
            IUsersRepository usersRepository)
            : base(appSettings, mapper)
        {
            _usersRepository = usersRepository;
        }

        [HttpGet]
        [AuthorizationFilter(Role.Admin)]
        public IActionResult GetAll()
        {
            var professors = _usersRepository.FindBy(x => x.Role == Role.Professor);
            var result = Mapper.Map<List<UserDto>>(professors);
            return Ok(result);
        }
    }
}
