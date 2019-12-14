import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../services/user.service';
import { RouterService } from '../services/router.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user :  User;
  private useid: string;
  private submitMessage :string;
  constructor(private userService: UserService, private routerService: RouterService,
    private authService: AuthenticationService) {
     
     
     }

  ngOnInit() {
    ///console.log("fff");
    this.userService.getUserById(this.authService.getUserId()).subscribe(result => {
    this.user = result;
      ///console.log('user jes '+JSON.stringify(result));
      console.log('user jes '+JSON.stringify(this.user));
    },
    (error) => {

      if (error.status === 404) {
        this.submitMessage = 'User not found ! please  login ';
      }
      else
      {
        console.log(error);
       
      }
    });
  }

  deleteUser() {
    this.userService.deleteUser().subscribe(res => {
      localStorage.removeItem("userId");
      localStorage.removeItem("bearerToken");
      this.routerService.routeToLogin();
    })
  }

  updateUser() {
    this.useid = this.authService.getUserId();
   this.routerService.routeToEditUserView(this.useid);
   
  }

}
