using System;
using System.Net;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NoteService.Exceptions;
using NoteService.Models;
using NoteService.Service;

namespace NoteService.Controllers
{
    /*
      As in this assignment, we are working with creating RESTful web service to create microservices, hence annotate
      the class with [ApiController] annotation and define the controller level route as per REST Api standard.
  */
  [Authorize]
    [Route("api/[controller]/")]
    [ApiController]
    public class NotesController : Controller
    {
        /*
        NoteService should  be injected through constructor injection. Please note that we should not create service
        object using the new keyword
        */    
        private readonly INoteService service;
        public NotesController(INoteService _service)
        {
            service = _service;
        }

        /*
	    * Define a handler method which will create a specific note by reading the
	    * Serialized object from request body and save the note details in the
	    * database.This handler method should return any one of the status messages
	    * basis on different situations: 
	    * 1. 201(CREATED) - If the note created successfully. 
	    
	    * This handler method should map to the URL "/api/note/{userId}" using HTTP POST method
	    */

        [HttpPost]
        [Route("{userId}")]
        public IActionResult Post([FromBody] Note note, string userId)
        {
            try
            {
                bool status = service.CreateNote(note);
                //if (status)
                //{
                return StatusCode((int)HttpStatusCode.Created, note);
                //}
            }
            catch (NoteNotFoundExeption ex)
            {

                return StatusCode((int)HttpStatusCode.BadRequest, ex.Message);
            }
            catch (NoteAlreadyExistsException ex)
            {

                return StatusCode((int)HttpStatusCode.Conflict, ex.Message);
            }
            catch (Exception ex)
            {

                return StatusCode((int)HttpStatusCode.BadRequest, ex.Message);
            }

        }



        /*
         * Define a handler method which will delete a note from a database.
         * This handler method should return any one of the status messages basis 
         * on different situations: 
         * 1. 200(OK) - If the note deleted successfully from database. 
         * 2. 404(NOT FOUND) - If the note with specified noteId is not found.
         *
         * This handler method should map to the URL "/api/note/{userId}/{noteId}" using HTTP Delete
         */
        [HttpDelete]
        [Route("{userId}/{noteId}")]
        public ActionResult Delete(string userId, int noteId)
        {
            try
            {
                return StatusCode((int)HttpStatusCode.OK, service.DeleteNote(userId, noteId));
                //return Ok(service.DeleteNote(noteId));
            }
            catch (NoteNotFoundExeption ex)
            {

                return NotFound(ex.Message);
            }
            catch (Exception)
            {

                return StatusCode((int)HttpStatusCode.InternalServerError);
            }
        }
        /*
         * Define a handler method which will update a specific note by reading the
         * Serialized object from request body and save the updated note details in a
         * database. 
         * This handler method should return any one of the status messages
         * basis on different situations: 
         * 1. 200(OK) - If the note updated successfully.
         * 2. 404(NOT FOUND) - If the note with specified noteId is not found.
         * 
         * This handler method should map to the URL "/api/note/{userId}/{noteId}" using HTTP PUT method.
         */

        [HttpPut]
        // [Route("{noteId}")]
        [Route("{userId}/{noteId}")]
        public IActionResult Put([FromBody] Note note, string userId, int noteId)
        {
            try
            {

                return StatusCode((int)HttpStatusCode.OK, service.UpdateNote(noteId, userId, note));
            }
            catch (NoteNotFoundExeption ex)
            {

                return StatusCode((int)HttpStatusCode.NotFound, ex.Message);
            }

            catch (Exception ex)
            {

                return StatusCode((int)HttpStatusCode.InternalServerError);
            }
        }

        /*
         * Define a handler method which will get us the all notes by a userId.
         * This handler method should return any one of the status messages basis on
         * different situations: 
         * 1. 200(OK) - If the note found successfully. 
         * 
         * This handler method should map to the URL "/api/note/{userId}" using HTTP GET method
         */
        [HttpGet]
        [Route("{userId}")]
        public IActionResult Get(string userId)
        {
            try
            {
                return Ok(service.GetAllNotesByUserId(userId));
            }
            catch (NoteNotFoundExeption ex)
            {

                return NotFound(ex.Message);
            }
        }
        /*
         * Define a handler method which will show details of a specific note created by specific 
         * user. This handler method should return any one of the status messages basis on
         * different situations: 
         * 1. 200(OK) - If the note found successfully. 
         * 2. 404(NOT FOUND) - If the note with specified noteId is not found.
         * This handler method should map to the URL "/api/note/{userId}/{noteId}" using HTTP GET method
         * where "id" should be replaced by a valid reminderId without {}
         * 
         */

    }
}
