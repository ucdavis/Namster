using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Namster.Jobs.ElasticSync
{
    public class Program
    {
        private static IConfigurationRoot _configuration;
        private static IServiceProvider _serviceProvider;

        public static void Main(string[] args)
        {
            // Set up configuration sources.
            var builder = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json")
                .AddUserSecrets()
                .AddEnvironmentVariables();

            _configuration = builder.Build();

            var services = new ServiceCollection();
            ConfigureServices(services);

            _serviceProvider = services.BuildServiceProvider();

            var uploader = _serviceProvider.GetService<NamSearchUploader>();
            uploader.Run();
        }

        private static void ConfigureServices(IServiceCollection services)
        {
            //services.AddSingleton<IConfiguration>(Configuration);
            services.AddTransient<NamSearchUploader, NamSearchUploader>();
        }

    }
}
