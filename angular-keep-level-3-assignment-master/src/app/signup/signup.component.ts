import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { RouterService } from '../services/router.service';
import { User } from '../user';
import { NgForOf } from '@angular/common';
import { NgForm } from '@angular/forms';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  ///signUpForm: NgForm;
  user: User;
  submitMessage: String;
  userId: String;
  userName: String;

   
  constructor( 
    private authService: AuthenticationService, private routerService: RouterService,
    private userService: UserService) { 
      this.user = new User();
     
    }

  ngOnInit() {
    // const bearerToken = this.authService.getBearerToken();
    // if (bearerToken != null) {
    //   localStorage.removeItem('bearerToken');
    //   localStorage.removeItem('userId');
    //   localStorage.removeItem('UserName');
     ///this.routerService.routeToLogin();
    // window.location.reload(); 
    // }
  }

  
//validation for login form
signUpForm = new FormGroup({
  UserId : new FormControl('', [Validators.required]),
  password : new FormControl('',[Validators.required,Validators.minLength(6)]),
  
  Contact : new FormControl('',[Validators.required,Validators.minLength(10)])

})

get UserId()
{
return this.signUpForm.get('UserId');
}


get password()
{
return this.signUpForm.get('password');
}
get Contact()
{
return this.signUpForm.get('Contact');
}


signUpUser()
{
 
  console.log(this.signUpForm.value);
  console.log('sign up');
  this.user=this.signUpForm.value
  console.log(this.user);
  this.authService.createUser(this.user).subscribe(res => {

  //this.authService.setUserId(this.user.UserId);
    console.log("sssss",res);
    this.user.Name = this.user.UserId;
     this.userService.createUser(this.user).subscribe(response => {
     console.log('create user -'+JSON.stringify(this.user));
 
     console.log(response);
       this.authService.setUserId(this.user.UserId);
     
     });
    this.routerService.routeToLogin();
  },
        (error) => {
          if (error.status === 409) {
            this.submitMessage = "userId conflicts with any existing user"
          }
        else {
          this.submitMessage = 'Invalid user details';
          }
      console.log(error);
        }
  
  );
}



}
