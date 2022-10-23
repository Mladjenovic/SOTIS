using Microsoft.Extensions.DependencyInjection;
using SOTIS_backend.Common.Enums;
using System;
using System.Linq;
using System.Reflection;

namespace SOTIS_backend.Common.Utilities
{
    public static class DIUtility
    {
        public static void RegisterServices(IServiceCollection services, Type typeFromDesiredAssembly, ServiceType serviceType)
        {
            var assembly = Assembly.GetAssembly(typeFromDesiredAssembly);
            var allExportedTypes = assembly.ExportedTypes;
            var allInterfaces = allExportedTypes.Where(t => t.IsInterface && typeFromDesiredAssembly.IsAssignableFrom(t) && t != typeFromDesiredAssembly).ToList();

            foreach (var iinterface in allInterfaces)
            {
                var implementationClass = allExportedTypes.FirstOrDefault(t => t.IsClass && iinterface.IsAssignableFrom(t));
                if (implementationClass == null)
                    continue;
                switch (serviceType)
                {
                    case ServiceType.Transient:
                        services.AddTransient(iinterface, implementationClass);
                        break;
                    case ServiceType.Singleton:
                        services.AddSingleton(iinterface, implementationClass);
                        break;
                    default:
                        services.AddScoped(iinterface, implementationClass);
                        break;
                }
            }
        }
    }
}
