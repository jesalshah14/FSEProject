using System;
using Microsoft.AspNetCore.Mvc;
using CategoryService.Service;
using CategoryService.Models;
using CategoryService.Exceptions;
using Microsoft.AspNetCore.Http;
using System.Net;
using Microsoft.AspNetCore.Authorization;

namespace CategoryService.API.Controllers
{
    /*
    As in this assignment, we are working with creating RESTful web service to create microservices, hence annotate
    the class with [ApiController] annotation and define the controller level route as per REST Api standard.
    */
    [Authorize]
    [Route("api/[controller]/")]
    [ApiController]
    public class CategoryController : Controller
    {
        /*
     CategoryService should  be injected through constructor injection. Please note that we should not create service
     object using the new keyword
    */
        private readonly ICategoryService categoryservice;
        public CategoryController(ICategoryService _service)
        {
            categoryservice = _service;
        }

        /*
	 * Define a handler method which will create a category by reading the
	 * Serialized category object from request body and save the category in
	 * database. This handler method should return any one of the status messages basis on
	 * different situations: 
	 * 1. 201(CREATED - In case of successful creation of the category
	 * 2. 409(CONFLICT) - In case of duplicate categoryId
	 *
	 * 
	 * This handler method should map to the URL "/api/category" using HTTP POST
	 * method".
	 */
        //[Route("api/category")]
        [HttpPost]
        public IActionResult Post([FromBody] Category category)
        {
            try
            {
                return StatusCode((int)HttpStatusCode.Created, categoryservice.CreateCategory(category));
            }
            catch (CategoryNotCreatedException ex)
            {
                return StatusCode((int)HttpStatusCode.Conflict, ex.Message);
            }
            catch (Exception)
            {

                return StatusCode((int)HttpStatusCode.InternalServerError);
            }
        }

        /*
         * Define a handler method which will delete a category from a database.
         * 
         * This handler method should return any one of the status messages basis on
         * different situations: 1. 200(OK) - If the category deleted successfully from
         * database. 2. 404(NOT FOUND) - If the category with specified categoryId is
         * not found. 
         * 
         * This handler method should map to the URL "/api/category/{id}" using HTTP Delete
         * method" where "id" should be replaced by a valid categoryId without {}
         */

        //[Route("api/category/{id}")]

        [HttpDelete]
        [Route("{id}")]
        public ActionResult Delete(int id)
        {
            try
            {
                return Ok(categoryservice.DeleteCategory(id));
            }
            catch (CategoryNotFoundException ex)
            {

                return NotFound(ex.Message);
            }
            catch (Exception)
            {

                return StatusCode((int)HttpStatusCode.InternalServerError);
            }
        }

        /*
         * Define a handler method which will update a specific category by reading the
         * Serialized object from request body and save the updated category details in
         * database. This handler method should return any one of the status
         * messages basis on different situations: 1. 200(OK) - If the category updated
         * successfully. 2. 404(NOT FOUND) - If the category with specified categoryId
         * is not found. 
         * This handler method should map to the URL "/api/category/{id}" using HTTP PUT
         * method.
         */


        //[Route("api/category/{id}")]
        [HttpPut]
        [Route("{CategoryId}")]
        public IActionResult Put([FromBody] Category category, int CategoryId)
        {
            try
            {

                Category obj = categoryservice.GetCategoryById(CategoryId);
                obj.Id = category.Id;
                obj.Name = category.Name;
                obj.CreationDate = DateTime.Now;
                obj.Description = category.Description;
                obj.CreatedBy = category.CreatedBy;
                
                return StatusCode((int)HttpStatusCode.OK, categoryservice.UpdateCategory(CategoryId, obj));
            }
            catch (CategoryNotFoundException ex)
            {

                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {

                return StatusCode((int)HttpStatusCode.InternalServerError);
            }
        }



        /*
         * Define a handler method which will get us the category by a userId.
         * This handler method should return any one of the status messages basis on
         * different situations: 1. 200(OK) - If the category found successfully. 
         * This handler method should map to the URL "/api/category/{userId}" using HTTP GET method
         */


        [HttpGet]
        // [Route("/api/category/GetByUserId/{userId}")]
        //[Route("api/category/{userId}")]
        [Route("{userId}")]
        public IActionResult GetByUserId(string userId)
        {
            try
            {
                return Ok(categoryservice.GetAllCategoriesByUserId(userId));
            }
            catch (CategoryNotFoundException ex)
            {

                return NotFound(ex.Message);
            }
        }

        /*
     * Define a handler method which will get us the category by a categoryId.
     * This handler method should return any one of the status messages basis on
     * different situations: 1. 200(OK) - If the category found successfully. 
     * This handler method should map to the URL "/api/category/{categoryId}" using HTTP GET method. categoryId must be an integer
     */

        [HttpGet]
        //[Route("/api/category/{categoryId}")]
        //[Route("api/category/{id}")]
        [Route("{categoryId:int}")]
        public IActionResult Get(int categoryId)
        {
            try
            {
                return Ok(categoryservice.GetCategoryById(categoryId));
            }
            catch (CategoryNotFoundException ex)
            {

                return NotFound(ex.Message);
            }
        }
    }
}
