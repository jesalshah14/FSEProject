using System;
using System.Net;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReminderService.Exceptions;
using ReminderService.Models;
using ReminderService.Service;

namespace ReminderService.Controllers
{
    /*
    As in this assignment, we are working with creating RESTful web service to create microservices, hence annotate
    the class with [ApiController] annotation and define the controller level route as per REST Api standard.
    */
  [Authorize]
    [Route("api/[controller]/")]
    [ApiController]
    public class ReminderController : Controller
    {
        /*
	 * From the problem statement, we can understand that the application requires
	 * us to implement five functionalities regarding reminder. They are as
	 * following:
	 * 
	 * 1. Create a reminder 
	 * 2. Delete a reminder 
	 * 3. Update a reminder 
	 * 4. Get all reminders by userId 
	 * 5. Get a specific reminder by id.
	 * 
	 */


        /*
     ReminderService should  be injected through constructor injection. Please note that we should not create service
     object using the new keyword
    */

        private readonly IReminderService service;
        public ReminderController(IReminderService reminderService)
        {
            service = reminderService;
        }


        /*
	 * Define a handler method which will create a reminder by reading the
	 * Serialized reminder object from request body and save the reminder in
	 * database. Please note that the reminderId has to be unique. This handler
	 * method should return any one of the status messages basis on different
	 * situations: 
	 * 1. 201(CREATED - In case of successful creation of the reminder
	 * 2. 409(CONFLICT) - In case of duplicate reminder ID
	 *
	 * This handler method should map to the URL "/api/reminder" using HTTP POST
	 * method".
	 */
        [HttpPost]
        public IActionResult Post([FromBody] Reminder reminder)
        {
            try
            {
                return StatusCode((int)HttpStatusCode.Created, service.CreateReminder(reminder));
            }
            catch (ReminderNotCreatedException ex)
            {
                return StatusCode((int)HttpStatusCode.Conflict, ex.Message);
            }
            catch (Exception)
            {

                return StatusCode((int)HttpStatusCode.InternalServerError);
            }
        }
        /*
         * Define a handler method which will delete a reminder from a database.
         * 
         * This handler method should return any one of the status messages basis on
         * different situations: 
         * 1. 200(OK) - If the reminder deleted successfully from database. 
         * 2. 404(NOT FOUND) - If the reminder with specified reminderId is not found.
         * 
         * This handler method should map to the URL "/api/reminder/{id}" using HTTP Delete
         * method" where "id" should be replaced by a valid reminderId without {}
         */
        [HttpDelete]
        [Route("{id}")]
        public ActionResult Delete(int id)
        {
            try
            {
                return Ok(service.DeleteReminder(id));
            }
            catch (ReminderNotFoundException ex)
            {

                return NotFound(ex.Message);
            }
            catch (Exception)
            {

                return StatusCode((int)HttpStatusCode.InternalServerError);
            }
        }
        /*
         * Define a handler method which will update a specific reminder by reading the
         * Serialized object from request body and save the updated reminder details in
         * a database. This handler method should return any one of the status messages
         * basis on different situations: 
         * 1. 200(OK) - If the reminder updated successfully. 
         * 2. 404(NOT FOUND) - If the reminder with specified reminderId is not found. 
         * 
         * This handler method should map to the URL "/api/reminder/{id}" using HTTP PUT
         * method.
         */
        [HttpPut]
        [Route("{reminderId}")]
        public IActionResult Put([FromBody] Reminder reminder, int reminderId)
        {
            try
            {

                Reminder obj = service.GetReminderById(reminderId);
                obj.Id = reminder.Id;
                obj.Name = reminder.Name;
                obj.CreationDate = reminder.CreationDate;
                obj.Description = reminder.Description;
                obj.CreatedBy = reminder.CreatedBy;
                obj.Type = reminder.Type;
                return StatusCode((int)HttpStatusCode.OK, service.UpdateReminder(reminderId, obj));
            }
            catch (ReminderNotFoundException ex)
            {

                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {

                return StatusCode((int)HttpStatusCode.InternalServerError);
            }
        }
        /*
         * Define a handler method which will show details of a specific reminder. This
         * handler method should return any one of the status messages basis on
         * different situations: 
         * 1. 200(OK) - If the reminder found successfully. 
         * 2. 404(NOT FOUND) - If the reminder with specified reminderId is not found. 
         * 
         * This handler method should map to the URL "/api/reminder/{id}" using HTTP GET method
         * where "id" should be replaced by a valid reminderId without {}
         */
        [HttpGet]
        [Route("{reminderId:int}")]
        public IActionResult Get(int reminderId)
        {
            try
            {
                return Ok(service.GetReminderById(reminderId));
            }
            catch (ReminderNotFoundException ex)
            {

                return NotFound(ex.Message);
            }
        }
        /*
         * Define a handler method which will get us the all reminders.
         * This handler method should return any one of the status messages basis on
         * different situations: 
         * 1. 200(OK) - If the reminder found successfully. 
         * 2. 404(NOT FOUND) - If the reminder with specified reminderId is not found.
         * 
         * This handler method should map to the URL "/api/reminder" using HTTP GET method
         */

        [HttpGet]
        [Route("{userId}")]
        public IActionResult GetByUserId(string userId)
        {
            try
            {
                return Ok(service.GetAllRemindersByUserId(userId));
            }
            catch (ReminderNotFoundException ex)
            {

                return NotFound(ex.Message);
            }
        }
    }
}
