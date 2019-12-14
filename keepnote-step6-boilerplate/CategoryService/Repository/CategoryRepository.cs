using System;
using System.Collections.Generic;
using System.Linq;
using CategoryService.Models;
using MongoDB.Driver;

namespace CategoryService.Repository
{
    public class CategoryRepository : ICategoryRepository
    {
        //define a private variable to represent CategoryContext
        CategoryContext context;
        public CategoryRepository(CategoryContext _context)
        {
            this.context = _context;
        }

        //This method should be used to save a new category.
        public Category CreateCategory(Category category)
        {
            try
            {
                int id = category.Id;
                if (id == 0)
                {
                    var lastCategory = context.Categories.Find(_ => true).ToList();
                    category.Id = (lastCategory.Last().Id) + 1;


                }
                category.CreationDate = DateTime.Now;
                context.Categories.InsertOne(category);

                return category;
            }
            catch
            {
                return null;
            }
        }

        //This method should be used to delete an existing category.
        public bool DeleteCategory(int categoryId)
        {
            bool status = false;
            var cat = context.Categories.Find(C => C.Id == categoryId).FirstOrDefault();
            if (cat != null)
            {
                var count = context.Categories.DeleteOne(C => C.Id == categoryId);

                return count.IsAcknowledged ? true : false;
            }
            else
            {

                status = false;
            }
            return status;
        }

        //This method should be used to get all category by userId
        public List<Category> GetAllCategoriesByUserId(string userId)
        {
            return context.Categories.Find(C => C.CreatedBy == userId).ToList();
        }

        //This method should be used to get a category by categoryId
        public Category GetCategoryById(int categoryId)
        {

            return context.Categories.Find(C => C.Id == categoryId).FirstOrDefault();
        }

        // This method should be used to update an existing category.
        public bool UpdateCategory(int categoryId, Category category)
        {
            bool status = false;
            var filter = Builders<Category>.Filter.Where(C => C.Id == categoryId);
            var update = Builders<Category>.Update.Set(S => S.Name, category.Name).Set(S => S.Description, category.Description).Set(S => S.CreatedBy, category.CreatedBy);
            var updateResult = context.Categories.UpdateOne(filter, update);
            if (updateResult != null)
            {
                status = true;
            }
            return status;
        }
    }
}
