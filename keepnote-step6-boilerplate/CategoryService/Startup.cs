using System.Collections.Generic;
using CategoryService.Models;
using CategoryService.Repository;
using CategoryService.Service;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Swashbuckle.AspNetCore.Swagger;

namespace CategoryService
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
            //register all dependecies here


            //  services.AddCors();
            services.AddCors(c =>
            {
                c.AddPolicy("Origin", options => options.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod().AllowCredentials());
            });
          
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
            services.AddScoped<CategoryContext>();
            services.AddScoped<ICategoryRepository, CategoryRepository>();
            services.AddScoped<ICategoryService, Service.CategoryService>();
            //validate token
            ValidateToken(Configuration, services);

            //configuring swagger
            services.AddSwaggerGen(s =>
                s.SwaggerDoc("categoryapidoc", new Info
                {
                    Title = "Category Service",
                    Description = "Category API Endpoints",
                    Version = "1.0.0"

                })
            );

            services.AddSwaggerGen(options =>
            {
                options.AddSecurityDefinition("categoryauth", new ApiKeyScheme
                {
                    Description = "JWT Authorization header using the Bearer scheme. Example: \"Authorization: Bearer {token}\"",                  
                    Name = "Authorization",
                    In = "header",
                    Type = "apiKey"

                });

                options.AddSecurityRequirement(new Dictionary<string, IEnumerable<string>>
                {
                    { "categoryauth", new string[] { } }
                });

            });
        }

        //Implement token validation logic
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


        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            //adding authentication for securing api
            app.UseAuthentication();


            //adding swagger mw
            app.UseSwagger();
            app.UseSwaggerUI(s =>
            {
                s.SwaggerEndpoint("/swagger/categoryapidoc/swagger.json", "category-api");
                //// s.RoutePrefix = string.Empty;

            });
            app.UseCors("Origin");
            app.UseMvc();
        }
    }
}
