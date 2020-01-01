using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using UserService.Models;
using UserService.Repository;
using UserService.Service;

using Swashbuckle.AspNetCore.Swagger;
using System.Collections.Generic;

namespace UserService
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

            //  services.AddCors();
            services.AddCors(c =>
            {
                c.AddPolicy("Origin", options => options.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod().AllowCredentials());
            });
            
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
            services.AddScoped<UserContext>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IUserService, Service.UserService>();
            //Implement token validation logic
            ValidateToken(Configuration, services);

            //configuring swagger
            services.AddSwaggerGen(s =>
                s.SwaggerDoc("userapidoc", new Info
                {
                    Title = "User Service",
                    Description = "User API Endpoints",
                    Version = "1.0.0"

                })
            );

            services.AddSwaggerGen(options =>
            {
                options.AddSecurityDefinition("userauth", new ApiKeyScheme
                {
                    Description = "JWT Authorization header using the Bearer scheme. Example: \"Authorization: Bearer {token}\"",
                    Name = "Authorization",
                    In = "header",
                    Type = "apiKey"

                });

                options.AddSecurityRequirement(new Dictionary<string, IEnumerable<string>>
                {
                    { "userauth", new string[] { } }
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
            app.UseAuthentication();
            // Enable middleware to serve generated Swagger as a JSON endpoint.
            app.UseSwagger();
            // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.),
            // specifying the Swagger JSON endpoint.
            app.UseSwaggerUI(s =>
            {
                s.SwaggerEndpoint("/swagger/userapidoc/swagger.json", "user-api");
                //// s.RoutePrefix = string.Empty;

            });

            // app.UseCors();
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
