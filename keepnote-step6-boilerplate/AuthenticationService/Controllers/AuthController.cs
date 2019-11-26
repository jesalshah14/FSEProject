﻿using System;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using System.Text;
using AuthenticationService.Exceptions;
using AuthenticationService.Models;
using AuthenticationService.Service;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;

namespace AuthenticationService.Controllers
{
    /*
   As in this assignment, we are working with creating RESTful web service to create microservices, hence annotate
   the class with [ApiController] annotation and define the controller level route as per REST Api standard.
   */
    [Route("api/[controller]")]
    [ApiController]

    public class AuthController : Controller
    {
        /*
       AuthService should  be injected through constructor injection. Please note that we should not create service
       object using the new keyword
      */
        IAuthService service;
        public AuthController(IAuthService authService)
        {
            this.service = authService;
        }


        /*
	     * Define a handler method which will create a specific user by reading the
	     * Serialized object from request body and save the user details in the
	     * database. This handler method should return any one of the status messages
	     * basis on different situations:
	     * 1. 201(CREATED) - If the user created successfully. 
	     * 2. 409(CONFLICT) - If the userId conflicts with any existing user
	     * 
	     * This handler method should map to the URL "/api/auth/register" using HTTP POST method
    	 */


        [HttpPost]
        [Route("register")]
        public IActionResult register([FromBody] User register)
        {
            try
            {
                return StatusCode((int)HttpStatusCode.Created, service.RegisterUser(register));
            }
            catch (UserAlreadyExistsException ex)
            {

                return StatusCode((int)HttpStatusCode.Conflict, ex.Message);
            }

        }



        /* Define a handler method which will authenticate a user by reading the Serialized user
         * object from request body containing the username and password. The username and password should be validated 
         * before proceeding ahead with JWT token generation. The user credentials will be validated against the database entries. 
         * The error should be return if validation is not successful. If credentials are validated successfully, then JWT
         * token will be generated. The token should be returned back to the caller along with the API response.
         * This handler method should return any one of the status messages basis on different
         * situations:
         * 1. 200(OK) - If login is successful
         * 2. 401(UNAUTHORIZED) - If login is not successful
         * 
         * This handler method should map to the URL "/api/auth/login" using HTTP POST method
        */

        [HttpPost]
        [Route("login")]
        public IActionResult login([FromBody] User user)
        {
            try
            {
                bool status = service.LoginUser(user);
                if (status)
                {
                    string token = GetToken(user.UserId);
                    return StatusCode((int)HttpStatusCode.OK, token);
                }
                else
                {
                    return StatusCode((int)HttpStatusCode.Unauthorized);
                }
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.Unauthorized, ex.Message);
            }
        }

        private string GetToken(string userId)
        {


            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.UniqueName,userId),
             new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };


            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("secret_jwt_token_key_02468_13579"));
            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(

                issuer: "AuthServer",
                audience: "authapi",
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(20),
                signingCredentials: cred
                );

            var response = new
            {

                token = new JwtSecurityTokenHandler().WriteToken(token)
            };
            return JsonConvert.SerializeObject(response);
        }


    }
}
