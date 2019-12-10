import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { RouterService } from '../services/router.service';
import { User } from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
    username = new FormControl('', [Validators.required]);
    password = new FormControl('',[Validators.required,Validators.minLength(6)])

  public submitMessage: string;

  private bearerToken: any;
  private user: User;

    constructor(private authService: AuthenticationService, private routerService: RouterService) { 
      this.user = new User();
    }
    
     
    loginSubmit() {
    //const user: any = {username: this.username.value, password: this.password.value};
    this.user.UserId = this.username.value;
    this.user.Password = this.password.value;


      if (this.username.hasError('required') || this.password.hasError('required')) {
        this.submitMessage = 'UserName and Password required';
      } else {
        this.authService.authenticateUser(this.user).subscribe (
          (response) => {

            //console.log(this.user);
           // console.log(response);
            // storing the token in localstorage of browser
            this.authService.setBearerToken(response['token']);
            this.authService.setUserId(this.username.value);
           this.authService.setUserName(this.username.value);
           
            // navigating to dashboard
           this.routerService.routeToDashboard();
           this.submitMessage = 'Login Successful';
            ////this.routerService.routeToNoteView();
          },
          (error) => {
            if (error.status === 404) {
              this.submitMessage = error.message;
            }
            if (error.status === 403) {
              this.submitMessage = error.error.message;
            }
            if (error.status === 401) {
              this.submitMessage = 'Unauthorized User, Please Sign Up';
            }
          else {
            this.submitMessage = 'Invalid user details';
            }
           // this.submitMessage = 'Invalid user details';
          //console.log(error);
          }
        );
      }
    }

    routeToSignUp() {
      this.routerService.routeToDashboard();
    }
}
