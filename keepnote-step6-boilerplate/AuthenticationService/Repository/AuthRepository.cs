using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AuthenticationService.Models;

namespace AuthenticationService.Repository
{
    public class AuthRepository : IAuthRepository
    {
        //Define a private variable to represent AuthDbContext
        readonly AuthDbContext context;
        public AuthRepository(AuthDbContext dbContext)
        {
            this.context = dbContext;
        }

        //This methos should be used to Create a new User
        public bool CreateUser(User user)
        {
            context.Users.Add(user);
            int returnValue = context.SaveChanges();
            return returnValue > 0 ? true : false;

        }

        //This methos should be used to check the existence of user
        public bool IsUserExists(string userId)
        {
            var user = context.Users.Where(u => u.UserId == userId);
            if (user.Count() > 0)
                return true;
            else
                return false;

        }

        //This methos should be used to Login a user
        public bool LoginUser(User user)
        {
            var userDetail = context.Users.Where(u => (u.UserId == user.UserId) && (u.Password == user.Password)).FirstOrDefault();
            if (userDetail != null)
                return true;
            else
                return false;

        }
    }
}
