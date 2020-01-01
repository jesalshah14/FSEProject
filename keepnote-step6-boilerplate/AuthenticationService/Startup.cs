using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AuthenticationService.Models;
using AuthenticationService.Repository;
using AuthenticationService.Service;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.EntityFrameworkCore;

using Swashbuckle.AspNetCore.Swagger;


namespace AuthenticationService
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
            //Register DbContext with connection string read from configuration
            //Register all dependencies here

            // services.AddCors();
            services.AddCors(c =>
            {
                c.AddPolicy("Origin", options => options.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod().AllowCredentials());
            });


            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
           // string constr = "Server=.\\sqlexpress;Database=AuthDb;User Id=sa;password=pass@123;";

            var constr = Environment.GetEnvironmentVariable("SQLSERVER_AUTH");
            if (constr == null)
            {
                constr = Configuration.GetConnectionString("AuthCon");
            }
           
            services.AddDbContext<AuthDbContext>(Options => Options.UseSqlServer(constr).UseLazyLoadingProxies());
            services.AddScoped<AuthDbContext>();
            services.AddScoped<IAuthRepository, AuthRepository>();
            services.AddScoped<IAuthService, AuthService>();

            //configuring swagger doc specfication
            services.AddSwaggerGen(s =>

                s.SwaggerDoc("authapidoc", new Info
                {
                    Title = "Authentication",
                    Description = "Authentication API Endpoints",
                    Version = "1.0.0"
                })
            );

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            //adding swagger mw
            app.UseSwagger();
            app.UseSwaggerUI(s =>
            {
                s.SwaggerEndpoint("/swagger/authapidoc/swagger.json", "auth-api");
               //// s.RoutePrefix = string.Empty;

            });
            app.UseCors("Origin");
            //mw for route configuration
            app.UseMvc();
        }
    }
}
