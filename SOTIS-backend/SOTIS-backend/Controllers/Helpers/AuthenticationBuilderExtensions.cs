using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using SOTIS_backend.Common.Settings;
using System.Text;

namespace SOTIS_backend.Controllers.Helpers
{
    public static class AuthenticationBuilderExtensions
    {
        public static AuthenticationBuilder AddJwtBearerAuthorization(this AuthenticationBuilder builder, JwtSettings jwtSettings)
        {
            return builder.AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,

                    ValidAudience = jwtSettings.Audience,
                    ValidIssuer = jwtSettings.Issuer,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.Secret))
                };
            });
        }
    }
}
