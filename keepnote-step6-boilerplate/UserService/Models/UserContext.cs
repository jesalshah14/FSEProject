using Microsoft.Extensions.Configuration;
using MongoDB.Driver;

namespace UserService.Models
{
    public class UserContext
    {
        //declare variable to connect to MongoDB database
        MongoClient mongoClient;
        IMongoDatabase database;
        public UserContext(IConfiguration configuration)
        {
            //Initialize MongoClient and Database using connection string and database name from configuration

            string server = configuration.GetSection("MongoDB:ConnectionString").Value;
            string db = configuration.GetSection("MongoDB:UserDatabase").Value;

            mongoClient = new MongoClient(server);
            database = mongoClient.GetDatabase(db);
        }
        public IMongoCollection<User> Users => database.GetCollection<User>("Users");
        //Define a MongoCollection to represent the Users collection of MongoDB
    }
}
