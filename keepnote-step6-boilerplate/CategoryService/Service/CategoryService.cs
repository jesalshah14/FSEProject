using System;
using System.Collections.Generic;
using CategoryService.Models;
using CategoryService.Repository;
using CategoryService.Exceptions;
using MongoDB.Driver;
using System.Linq;

namespace CategoryService.Service
{
    public class CategoryService:ICategoryService
    {
        //define a private variable to represent repository
        private readonly ICategoryRepository repo;
        //Use constructor Injection to inject all required dependencies.
        public CategoryService(ICategoryRepository _repository)
        {
            repo = _repository;
        }

        //This method should be used to save a new category.
        public Category CreateCategory(Category category)
        {
            var _category = repo.CreateCategory(category);
            if (_category != null)
            {
                return _category;
            }
            else
            {
                throw new CategoryNotCreatedException($"This category already exists");
            }
        }
        //This method should be used to delete an existing category.
        public bool DeleteCategory(int categoryId)
        {
            bool status = repo.DeleteCategory(categoryId);
            if (status)
            {
                return status;
            }
            else
            {
                throw new CategoryNotFoundException($"This category id not found");
            }
        }
        // This method should be used to get all category by userId
        public List<Category> GetAllCategoriesByUserId(string userId)
        {
            var _category = repo.GetAllCategoriesByUserId(userId);
            if (_category == null || _category.Count == 0)
            {
                throw new CategoryNotFoundException($"This category id not found");
            }
            else
            {
                return _category;
            }
        }
        //This method should be used to get a category by categoryId.
        public Category GetCategoryById(int categoryId)
        {
            var _category = repo.GetCategoryById(categoryId);
            if (_category == null)
            {
                throw new CategoryNotFoundException($"This category id not found");
            }
            else
            {
                return _category;
            }
            throw new NotImplementedException();
        }
        //This method should be used to update an existing category.
        public bool UpdateCategory(int categoryId, Category category)
        {
            var _category = repo.GetCategoryById(categoryId);
            if (_category == null)
            {
                throw new CategoryNotFoundException($"This category id not found");
            }
            else
            {

                return repo.UpdateCategory(categoryId, category);
            }
        }
    }
}
