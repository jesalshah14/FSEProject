using AuthenticationService.Exceptions;
using AuthenticationService.Models;
using AuthenticationService.Repository;
using System;

namespace AuthenticationService.Service
{
    public class AuthService : IAuthService
    {
        //define a private variable to represent repository
        private readonly IAuthRepository repo;
        //Use constructor Injection to inject all required dependencies.

        public AuthService(IAuthRepository authRepository)
        {
            this.repo = authRepository;
        }

        //This methos should be used to register a new user
        public bool RegisterUser(User user)
        {
            bool userExist = repo.IsUserExists(user.UserId);
            if (!userExist)
            {
                return repo.CreateUser(user); ;
            }
            else
            {
                throw new UserAlreadyExistsException($"This userId {user.UserId} already in use");
            }

        }

        //This method should be used to login for existing user
        public bool LoginUser(User user)
        {
            bool status = repo.LoginUser(user);
            if (status)
            {
                return status;
            }
            else
            {

                throw new UserAlreadyExistsException("Invalid user id or password");
            }

        }
    }
}
