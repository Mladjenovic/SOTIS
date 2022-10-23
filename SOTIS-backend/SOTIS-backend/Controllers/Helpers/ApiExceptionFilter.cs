using Microsoft.AspNetCore.Mvc.Filters;
using SOTIS_backend.Common.Exceptions;
using System.Net;
using System.Text;

namespace SOTIS_backend.Controllers.Helpers
{
    public class ApiExceptionFilter : IExceptionFilter
    {
        public void OnException(ExceptionContext context)
        {
            if (context.Exception is NotAuthenticated)
            {
                CreateHttpResponse(context, (int)HttpStatusCode.Unauthorized);
            }
            else if (context.Exception is NotAuthorized)
            {
                CreateHttpResponse(context, (int)HttpStatusCode.Forbidden);
            }
            else
            {
                CreateHttpResponse(context, (int)HttpStatusCode.InternalServerError);
            }
        }

        private static void CreateHttpResponse(ExceptionContext context, int statusCode)
        {
            context.HttpContext.Response.StatusCode = statusCode;
            context.HttpContext.Response.ContentType = "application/json";
            context.HttpContext.Response.Body.WriteAsync(Encoding.UTF8.GetBytes(context.Exception.Message)).ConfigureAwait(false).GetAwaiter().GetResult();
        }
    }
}
