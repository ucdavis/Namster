using AspNetCore.Security.CAS;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Namster.Services;
using Namster.Attributes;
using Namster.Models;
using SpaCliMiddleware;

namespace Namster
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<AuthSettings>(Configuration.GetSection("Authentication"));

            services.Configure<CookiePolicyOptions>(options =>
            {
                // This lambda determines whether user consent for non-essential cookies is needed for a given request.
                options.CheckConsentNeeded = context => true;
                options.MinimumSameSitePolicy = SameSiteMode.None;
            });

            services.AddAuthentication(options =>
                {
                    options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                })
                .AddCookie(options =>
                {
                    options.LoginPath = new PathString("/login");
                })
                .AddCAS(options =>
                {
                    options.CasServerUrlBase = Configuration["Authentication:CasBaseUrl"];   // Set in `appsettings.json` file.
                    options.SignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                });

            services.AddTransient<ISearchService, SearchService>();
            services.AddTransient<IAuthTokenFilter, AuthTokenFilter>();

            // Add framework services.
            services.AddMvc()
                .SetCompatibilityVersion(CompatibilityVersion.Version_3_0)
                .AddRazorRuntimeCompilation()
                .AddNewtonsoftJson();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseBrowserLink();

                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseStaticFiles();
            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(routes =>
            {
                routes.MapControllerRoute(
                    name: "search",
                    pattern: "{controller=Home}/{action=Index}/{id?}");

                if (env.IsDevelopment())
                {
                    routes.MapToSpaCliProxy(
                        "{*path}",
                        options: new SpaOptions { SourcePath = "wwwroot/dist" },
                        npmScript: "devpack",
                        port: /*default(int)*/ 8080, // Allow webpack to find own port
                        regex: "Project is running",
                        forceKill: true, // kill anything running on our webpack port
                        useProxy: true, // proxy webpack requests back through our aspnet server
                        runner: ScriptRunnerType.Npm
                    );
                }

                //routes.MapFallbackToController("Index", "Home");
            });
        }
    }
}
