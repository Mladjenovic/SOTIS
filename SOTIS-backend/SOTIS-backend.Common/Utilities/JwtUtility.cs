using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using SOTIS_backend.Common.Models;
using SOTIS_backend.Common.Settings;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace SOTIS_backend.Common.Utilities
{
    public static class JwtUtility
    {
        public static string CreateJwtToken(AppSettings appSettings, SessionInfo sessionInfo)
        {
            var key = Encoding.UTF8.GetBytes(appSettings.Jwt.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(Constants.SessionInfo, JsonConvert.SerializeObject(sessionInfo))
                }),
                Expires = DateTime.UtcNow.AddSeconds(appSettings.Jwt.JwtTokenExpiresInSeconds),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
                Issuer = appSettings.Jwt.Issuer,
                Audience = appSettings.Jwt.Audience
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
