using System;
using System.Linq;
using MongoDB.Driver;
using UserService.Models;

namespace UserService.Repository
{
    public class UserRepository:IUserRepository
    {
        //define a private variable to represent UserContext
        UserContext context;
        public UserRepository(UserContext _context)
        {
            this.context = _context;
        }
        //This method should be used to delete an existing user.
        public bool DeleteUser(string userId)
        {
            bool status = false;
            var _user = context.Users.Find(U => U.UserId == userId).FirstOrDefault();
            if (_user != null)
            {
                var count = context.Users.DeleteOne(U => U.UserId == userId);

                status = count.IsAcknowledged ? true : false;
            }
            else
            {

                status = false;
            }
            return status;
        }

        //This method should be used to delete an existing user
        public User GetUserById(string userId)
        {
            return context.Users.Find(U => U.UserId == userId).FirstOrDefault();
        }
        //This method is used to register a new user
        public User RegisterUser(User user)
        {
            try
            {
                user.AddedDate = DateTime.Now;
                context.Users.InsertOne(user);
                return user;
            }
            catch
            {
                return null;
            }
        }
        //This methos is used to update an existing user
        public bool UpdateUser(string userId, User user)
        {
            {
                var filter = Builders<User>.Filter.Where(U => U.UserId == userId);
                var update = Builders<User>.Update.Set(S => S.Name, user.Name).Set(S => S.Contact, user.Contact);

                var updateResult = context.Users.UpdateOne(filter, update);
                return updateResult.IsAcknowledged ? true : false;
            }
        }
    }
}
