# Keep Note Final Assignment 

### Project Objective

    The objective of this project is to create a Keep Note Application which helps users 
    to take notes of different categories & reminder for each note. 

### Application Overview

    1. A user will have to login first or register. 
    2. A user should be able to register him/herself by providing required details.  
    3. A user can perform crud on notes. A note can be associated with a particular category & reminders.
    4. Note has two views card & list. In list view notes are categorised based on their states
       not-started,started & completed.Category & Reminder have only card view. 
    5. A user can perform crud on categories. 
    6. A user can perform crud on reminders.  
    7. A user can also view his profile & edit it.
    8. A uer should be able to logout from the site, only after successful login. 
   
### Git-Repo for solution code

    https://gitlab-cts.stackroute.in/JesalRajendra.Shah/final_keepnote_assignment


### Steps to fetch the code from git-repo

1.  Clone the repo url in the folder **Jesal-Final-Assignment** of your local machine
     
     `git clone https://gitlab-cts.stackroute.in/JesalRajendra.Shah/final_keepnote_assignment.git Jesal-Final-Assignment`

2.  Navigate to Jesal-Final-Assignment folder

     `cd Jesal-Final-Assignment`

3.  Check the status of your repo 
     
      `git status`

4.  Use the following command to update the index using the current content found in the working tree, to prepare the content staged for the next commit.

      `git add .`
 
5.  Commit and Push the project to git

      `git commit -a -m "Initial commit | or place your comments according to your need"`

      `git push -u origin master`

6.  Check on the git repo online, if the files have been pushed


7.  Can also    
                *  Fork this boilerplate repository  
                *  Clone the boilerplate repository and cd into it  
                *  Install dependencies under angular-keep-level-3-assignment-master folder `npm install`  


### Steps to launch the app with port no

    To run the frontend 
    
            1.ng serve --open which shall run on port:4200  :: (locally)
            2.http://localhost:4200/                        :: (via docker-compose up cmd)
    
    To run the backend with Swagger API DOCS
    
<<<<<<< HEAD
            1. AuthenticationService  :: http://localhost:8085/swagger/index.html
            2. UserService            :: http://localhost:8084/swagger/index.html
            3. NoteService            :: http://localhost:8082/swagger/index.html
            4. CategoryService        :: http://localhost:8081/swagger/index.html
            5. ReminderService        :: http://localhost:8083/swagger/index.html
=======
            1. AuthenticationService  ::
            2. UserService            ::
            3. NoteService            ::
            4. CategoryService        ::
            5. ReminderService        ::
>>>>>>> 6d6ac52d44f01bff7003b8e4c765ad860616d115


###  API Urls for backend Microservices & services provided.

    API Urls for backend Microservices

<<<<<<< HEAD
            1. AuthenticationService  
                  Register        :: POST :: http://localhost:8085/api/auth/register
                  Login           :: POST :: http://localhost:8085/api/auth/login

            2. UserService
                  Create User     :: POST   :: http://localhost:8084/api/user  
                  Read UserByID   :: GET    :: http://localhost:8084/api/user/{userId}
                  Update User     :: PUT    :: http://localhost:8084/api/user/{userId}
                  Delete User     :: DELETE :: http://localhost:8084/api/user/{userId}  
 
            3. NoteService            
                  Create User     :: POST   :: http://localhost:8082/api/notes/{userId}  
                  Read UserByID   :: GET    :: http://localhost:8082/api/notes/{userId}
                  Update User     :: PUT    :: http://localhost:8082/api/notes/{userId}/{noteId}
                  Delete User     :: DELETE :: http://localhost:8082/api/notes/{userId}/{noteId} 

            4. CategoryService     
                  Create Category :: POST   :: http://localhost:8081/api/category  
                  Read By ID      :: GET    :: http://localhost:8081/api/category/{categoryId}
                  Read By UserID  :: GET    :: http://localhost:8081/api/category/{userId}
                  Update Category :: PUT    :: http://localhost:8081/api/category/{categoryId}
                  Delete Category :: DELETE :: http://localhost:8081/api/category/{categoryId} 

            5. ReminderService   
                  Create Reminder :: POST   :: http://localhost:8083/api/reminder  
                  Read By ID      :: GET    :: http://localhost:8083/api/reminder/{reminderId}
                  Read By UserID  :: GET    :: http://localhost:8083/api/reminder/{userId}
                  Update Reminder :: PUT    :: http://localhost:8083/api/reminder/{reminderId}
                  Delete Reminder :: DELETE :: http://localhost:8083/api/reminder/{reminderId} 

 

| **Services Provided** |  |  | 
| ----------| ------------ | --------------------------- | 
| KeepNote-ui | Microservice | Angular 6 |
| AuthenticationService |  Microservice | ASP.NeT CORE, JWT |
| NoteService |  Microservice | ASP.NeT CORE, JWT |
| CategoryService |  Microservice |  ASP.NeT CORE, JWT |
| ReminderService |  Microservice |  ASP.NeT CORE, JWT |
| UserService| Micro service | ASP.NeT CORE, JWT |
| Container | Hosting and orchestration | Docer, Docker Compose |
| Datastore | MongoDB | NoSQL  | 
| Datastore | RDBMS | MySQL  | 




=======
            1. AuthenticationService  ::
            2. UserService            ::
            3. NoteService            ::
            4. CategoryService        ::
            5. ReminderService        ::

 

| **Services Provided** |  |  | 
| ----------| ------------ | --------------------------- | 
| KeepNote-ui | Microservice | Angular 6 |
| AuthenticationService |  Microservice | ASP.NeT CORE, JWT |
| NoteService |  Microservice | ASP.NeT CORE, JWT |
| CategoryService |  Microservice |  ASP.NeT CORE, JWT |
| ReminderService |  Microservice |  ASP.NeT CORE, JWT |
| UserService| Micro service | ASP.NeT CORE, JWT |
| Container | Hosting and orchestration | Docer, Docker Compose |
| Datastore | MongoDB | NoSQL  | 
| Datastore | RDBMS | MySQL  | 




>>>>>>> 6d6ac52d44f01bff7003b8e4c765ad860616d115



