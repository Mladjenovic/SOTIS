using Microsoft.AspNetCore.Mvc.Filters;
using SOTIS_backend.Common.Enums;
using SOTIS_backend.Common.Exceptions;
using System.Linq;
using System.Threading.Tasks;

namespace SOTIS_backend.Controllers.Helpers
{
    public class AuthorizationFilterAttribute : ActionFilterAttribute
    {       
        private readonly Role[] _roles;

        public AuthorizationFilterAttribute(params Role[] roles)
        {
            _roles = roles;
        }

        public override async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var sessionInfo = (context.Controller as AbstractController).GetSession();
            if (sessionInfo == null)
            {
                throw new NotAuthenticated("User is unknown");
            }

            if (!_roles.Any(r => r.Equals(sessionInfo.Role)))
            {
                throw new NotAuthorized("Action cannot be performed with current role");
            }

            await next();
        }
    }
}
