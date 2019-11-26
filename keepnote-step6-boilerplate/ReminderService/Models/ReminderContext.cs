using Microsoft.Extensions.Configuration;
using MongoDB.Driver;

namespace ReminderService.Models
{
    public class ReminderContext
    {
        //declare variables to connect to MongoDB database

        MongoClient mongoClient;
        IMongoDatabase database;
        public ReminderContext(IConfiguration configuration)
        {
            //Initialize MongoClient and Database using connection string and database name from configuration
            string server = configuration.GetSection("MongoDB:ConnectionString").Value;
            string db = configuration.GetSection("MongoDB:ReminderDatabase").Value;

            mongoClient = new MongoClient(server);
            database = mongoClient.GetDatabase(db);
        }
        //Define a MongoCollection to represent the Reminders collection of MongoDB
        public IMongoCollection<Reminder> Reminders => database.GetCollection<Reminder>("Reminders");
    }
}

