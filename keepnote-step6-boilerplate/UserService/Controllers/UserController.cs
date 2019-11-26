using System;
using System.Net;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UserService.Exceptions;
using UserService.Models;
using UserService.Service;

namespace UserService.Controllers
{
    /*
   As in this assignment, we are working with creating RESTful web service to create microservices, hence annotate
   the class with [ApiController] annotation and define the controller level route as per REST Api standard.
   */
   [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        /*
   UserService should  be injected through constructor injection. Please note that we should not create service
   object using the new keyword
  */

        private readonly IUserService service;
        public UserController(IUserService userService)
        {
            service = userService;
        }
        /*
         * Define a handler method which will create a specific user by reading the
         * Serialized object from request body and save the user details in the
         * database. This handler method should return any one of the status messages
         * basis on different situations:
         * 1. 201(CREATED) - If the user created successfully. 
         * 2. 409(CONFLICT) - If the userId conflicts with any existing user
         * 
         * This handler method should map to the URL "/api/user" using HTTP POST method
         */
        [HttpPost]
        // [Route("register")]
        public IActionResult Post([FromBody] User register)
        {
            try
            {
                return StatusCode((int)HttpStatusCode.Created, service.RegisterUser(register));
            }
            catch (UserNotCreatedException ex)
            {
                return StatusCode((int)HttpStatusCode.Conflict, ex.Message);
            }
            catch (UserNotFoundException ex)
            {

                return StatusCode((int)HttpStatusCode.NotFound, ex.Message);
            }
        }
        /*
         * Define a handler method which will update a specific user by reading the
         * Serialized object from request body and save the updated user details in a
         * database. This handler method should return any one of the status messages
         * basis on different situations: 
         * 1. 200(OK) - If the user updated successfully.
         * 2. 404(NOT FOUND) - If the user with specified userId is not found.
         * 
         * This handler method should map to the URL "/api/user/{id}" using HTTP PUT method.
         */
        [HttpPut]
        [Route("{UserId}")]
        public IActionResult Put([FromBody] User user, string UserId)
        {
            try
            {
                User user1 = new User();
                user1 = service.GetUserById(UserId);
                user1.UserId = user.UserId;
                user1.Name = user.Name;
                user1.Contact = user.Contact;


                //  return StatusCode((int)HttpStatusCode.OK, service.UpdateUser(UserId, user1));
                service.UpdateUser(UserId, user1);
                return Ok(user1);
            }
            catch (UserNotFoundException ex)
            {

                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {

                return StatusCode((int)HttpStatusCode.InternalServerError);
            }
        }
        /*
         * Define a handler method which will delete a user from a database.
         * This handler method should return any one of the status messages basis on
         * different situations: 
         * 1. 200(OK) - If the user deleted successfully from database. 
         * 2. 404(NOT FOUND) - If the user with specified userId is not found.
         *
         * This handler method should map to the URL "/api/user/{id}" using HTTP Delete
         * method" where "id" should be replaced by a valid userId without {}
         */
        [HttpDelete]
        [Route("{userId}")]
        public ActionResult Delete(string userId)
        {
            try
            {
                return StatusCode((int)HttpStatusCode.OK, service.DeleteUser(userId));
            }
            catch (UserNotFoundException ex)
            {
                return NotFound(ex.Message);
                //return StatusCode((int)HttpStatusCode.NotFound, $"User with id: {id} does not exist");
                // throw  new UserNotFoundException($"User with id: {id} does not exist");
            }
            catch (Exception)
            {

                return StatusCode((int)HttpStatusCode.InternalServerError);
            }
        }
        /*
         * Define a handler method which will show details of a specific user. This
         * handler method should return any one of the status messages basis on
         * different situations: 
         * 1. 200(OK) - If the user found successfully. 
         * 2. 404(NOT FOUND) - If the user with specified userId is not found. 
         * This handler method should map to the URL "/api/user/{id}" using HTTP GET method where "id" should be
         * replaced by a valid userId without {}
         */

        [HttpGet]
        [Route("{userId}")]
        public IActionResult Get(string userId)
        {
            try
            {
                return Ok(service.GetUserById(userId));
            }
            catch (UserNotFoundException ex)
            {

                return NotFound(ex.Message);
            }
        }
    }
}
