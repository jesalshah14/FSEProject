using System;
using UserService.Exceptions;
using UserService.Models;
using UserService.Repository;

namespace UserService.Service
{
    public class UserService : IUserService
    {
        //define a private variable to represent repository
        IUserRepository repo;
        //Use constructor Injection to inject all required dependencies.


        public UserService(IUserRepository userRepository)
        {
            this.repo = userRepository;
        }

        //This method should be used to delete an existing user.
        public bool DeleteUser(string userId)
        {
            bool status = repo.DeleteUser(userId);
            if (status)
            {
                return status;
            }
            else
            {
                throw new UserNotFoundException($"This user id does not exist");
            }
        }
        //This method should be used to delete an existing user
        public User GetUserById(string userId)
        {
            var users = repo.GetUserById(userId);
            if (users == null)
            {
                throw new UserNotFoundException($"This user id does not exist");
            }
            else
            {
                return users;
            }
        }
        //This method is used to register a new user
        public User RegisterUser(User user)
        {
            ////if (user != null)
            ////{
            //return user;
            ////}
            var userExists = repo.GetUserById(user.UserId);
            if (userExists == null)
            {

                var users = repo.RegisterUser(user);
                return users;

            }
            else
            {
                throw new UserNotCreatedException($"This user id already exists");
            }

        }
        //This methos is used to update an existing user
        public bool UpdateUser(string userId, User user)
        {
            var users = repo.GetUserById(userId);
            if (users == null)
            {
                throw new UserNotFoundException($"This user id does not exist");
            }
            else
            {

                return repo.UpdateUser(userId, user);
            }
        }
    }
}
