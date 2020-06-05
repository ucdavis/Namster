using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;

namespace Namster
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateWebHostBuilder(args).Build().Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .ConfigureAppConfiguration((hostContext, config) =>
                {
                    // Extend default builder to allow loading user secrets when debugging locally in Production mode
                    var env = hostContext.HostingEnvironment;

                    if (!env.IsDevelopment() && string.Equals(Environment.GetEnvironmentVariable("ASPNETCORE_LOAD_SECRETS"), "True", StringComparison.OrdinalIgnoreCase))
                    {
                        var appAssembly = Assembly.Load(new AssemblyName(env.ApplicationName));

                        if (appAssembly != null)
                        {
                            config.AddUserSecrets(appAssembly, optional: true);
                        }
                    }
                })
                .UseStartup<Startup>();
    }
}
