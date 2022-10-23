using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using SOTIS_backend.Common;
using SOTIS_backend.Common.Models;
using SOTIS_backend.Common.Settings;
using SOTIS_backend.Common.Utilities;
using SOTIS_backend.Controllers.Dtos;
using SOTIS_backend.DataAccess.Interfaces;
using SOTIS_backend.DataAccess.Models;

namespace SOTIS_backend.Controllers
{
    public class UsersController : AbstractController
    {
        private readonly IUsersRepository _usersRepository;

        public UsersController(
            IOptions<AppSettings> appSettings,
            IMapper mapper,
            IUsersRepository userRepository)
            : base(appSettings, mapper)
        {
            _usersRepository = userRepository;
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public IActionResult Login([FromBody] LoginDto loginDto)
        {
            var user = _usersRepository.GetSingle(x => x.Username == loginDto.Username);
            if (user == null)
            {
                return BadRequest("User does not exist!");
            }

            var sessionInfo = Mapper.Map<SessionInfo>(user);
            var idToken = JwtUtility.CreateJwtToken(AppSettings, sessionInfo);
            Request.HttpContext.Response.Headers.Add(Constants.AccessToken, idToken);
            return Ok();
        }

        [HttpPost("register")]
        [AllowAnonymous]
        public IActionResult Register([FromBody] RegisterDto registerDto)
        {
            var user = _usersRepository.GetSingle(x => x.Username == registerDto.Username);
            if (user != null)
            {
                return BadRequest("User already exists!");
            }

            user = Mapper.Map<User>(registerDto);
            _usersRepository.Add(user);
            _usersRepository.Commit();

            return StatusCode(201);
        }
    }
}
