using Microsoft.Extensions.Configuration;
using MongoDB.Driver;

namespace CategoryService.Models
{
    public class CategoryContext
    {
        //declare variable to connect to MongoDB database

        MongoClient mongoClient;
        IMongoDatabase database;
        public CategoryContext(IConfiguration configuration)
        {
            //Initialize MongoClient and Database using connection string and database name from configuration
            string server = configuration.GetSection("MongoDB:ConnectionString").Value;
            string db = configuration.GetSection("MongoDB:CategoryDatabase").Value;

            mongoClient = new MongoClient(server);
            database = mongoClient.GetDatabase(db);
        }

        //Define a MongoCollection to represent the Categories collection of MongoDB
        public IMongoCollection<Category> Categories => database.GetCollection<Category>("Categories");
    }
}
