using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using NoteService.Models;
using NoteService.Repository;
using NoteService.Service;

namespace NoteService
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
            //register all dependencies here
            //Implement token validation logic
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
            services.AddScoped<NoteContext>();
            services.AddScoped<INoteRepository, NoteRepository>();
            services.AddScoped<INoteService, NoteService.Service.NoteService>();
            ValidateToken(Configuration, services);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseAuthentication();

            app.UseMvc();
        }
        private void ValidateToken(IConfiguration configuration, IServiceCollection services)
        {
            var audienceConfig = configuration.GetSection("Audience");
            var secretKey = audienceConfig["key"];
            var keyByteArray = System.Text.Encoding.ASCII.GetBytes(secretKey);
            var signature = new SymmetricSecurityKey(keyByteArray);


            var tokenParameter = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = signature,
                ValidateIssuer = true,
                ValidIssuer = audienceConfig["iss"],
                ValidateAudience = true,
                ValidAudience = audienceConfig["aud"],
                ValidateLifetime = true,
                ClockSkew = System.TimeSpan.Zero
            };

            services.AddAuthentication(options => {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(o => {

                o.TokenValidationParameters = tokenParameter;
            });
        }

    }
}
