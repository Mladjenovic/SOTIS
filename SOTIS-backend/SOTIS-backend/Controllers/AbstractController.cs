using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using SOTIS_backend.Common;
using SOTIS_backend.Common.Models;
using SOTIS_backend.Common.Settings;
using System.IdentityModel.Tokens.Jwt;

namespace SOTIS_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AbstractController : ControllerBase
    {
        protected AppSettings AppSettings { get; private set; }

        protected IMapper Mapper { get; private set; }

        public AbstractController(IOptions<AppSettings> appSettings, IMapper mapper)
        {
            AppSettings = appSettings.Value;
            Mapper = mapper;
        }

        internal SessionInfo GetSession()
        {
            var accessToken = ReadAccessToken();
            if (string.IsNullOrEmpty(accessToken))
                return null;

            var jwt = new JwtSecurityTokenHandler().ReadJwtToken(accessToken);
            if (!jwt.Issuer.Equals(AppSettings.Jwt.Issuer))
                return null;

            try
            {
                return JsonConvert.DeserializeObject<SessionInfo>(jwt.Payload[Constants.SessionInfo].ToString());
            }
            catch
            {
                return null;
            }
        }

        private string ReadAccessToken()
        {
            var authHeader = Request.Headers[Constants.Authorization].ToString();
            if (string.IsNullOrEmpty(authHeader))
                return null;

            var tokenPrefixLength = $"{JwtBearerDefaults.AuthenticationScheme} ".Length;
            if (authHeader.Length < tokenPrefixLength)
                return null;

            var idToken = authHeader.Substring(tokenPrefixLength).Trim();
            return idToken;
        }
    }
}
