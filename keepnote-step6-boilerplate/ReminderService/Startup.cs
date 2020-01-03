using System.Collections.Generic;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using ReminderService.Models;
using ReminderService.Repository;
using ReminderService.Service;

using Swashbuckle.AspNetCore.Swagger;
namespace ReminderService
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

            //Add cors origin resource
            services.AddCors(options =>
            {
                options.AddPolicy("Origin",
                builder =>
                {
                    builder.WithOrigins(this.Configuration.GetSection("Cors")["Angular"])
                    .AllowAnyHeader()
                    .AllowAnyMethod();
                });
            });


            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
            services.AddScoped<ReminderContext>();
            services.AddScoped<IReminderService, Service.ReminderService>();
            services.AddScoped<IReminderRepository, ReminderRepository>();
            //Implement token validation logic
            ValidateToken(Configuration, services);

            //configuring swagger
            services.AddSwaggerGen(s =>
                s.SwaggerDoc("reminderapidoc", new Info
                {
                    Title = "Reminder Service",
                    Description = "Reminder API Endpoints",
                    Version = "1.0.0"

                })
            );

            services.AddSwaggerGen(options =>
            {
                options.AddSecurityDefinition("reminderauth", new ApiKeyScheme
                {
                    Description = "JWT Authorization header using the Bearer scheme. Example: \"Authorization: Bearer {token}\"",
                    Name = "Authorization",
                    In = "header",
                    Type = "apiKey"

                });

                options.AddSecurityRequirement(new Dictionary<string, IEnumerable<string>>
                {
                    { "reminderauth", new string[] { } }
                });

            });
        
    }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            //securing the api
            app.UseAuthentication();
            //adding swagger mw
            app.UseSwagger();
            app.UseSwaggerUI(s =>
            {
                s.SwaggerEndpoint("/swagger/reminderapidoc/swagger.json", "reminder-api");
                //// s.RoutePrefix = string.Empty;

            });
            app.UseCors("Origin");
            app.UseMvc();
        }

        //Validate Token
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
