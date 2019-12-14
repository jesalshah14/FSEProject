import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';
import { RouterService } from '../services/router.service';
import { User } from '../user';

@Component({
  selector: 'app-edit-user-view',
  templateUrl: './edit-user-view.component.html',
  styleUrls: ['./edit-user-view.component.css']
})
export class EditUserViewComponent implements OnInit {

  private user: User;
  private username:string;
  private userId: string;
  public submitMessage: string;
  constructor(private activatedRoute: ActivatedRoute, 
    private userService: UserService,
    private routerService: RouterService,
    private authService: AuthenticationService) {
      this.user = new User();

      console.log("ddd"+ this.userId);
    //   debugger;
   //this.activatedRoute.params.subscribe(pass => this.userId = pass.userId);or from authservice
    this.userService.getUserById(this.authService.getUserId()).subscribe(user => {
      this.user = user;
      //console.log(this.user);
    },
     (error) => {
       
      if (error.status === 404) {
        this.submitMessage = 'Userid not found ! please give the correct login userId';
      }
      else
      {
        console.log(error);
        this.submitMessage = error.message;
      }
    });
  }

  ngOnInit() {
  }

  onSave() {
    this.userService.updateUser(this.user).subscribe(
      (response) =>{ 
        console.log(response);
    // this.authService.setUserName(this.user['name']);
       this.routerService.routeToUser();
      },
      (error) => {
       
        if (error.status === 404) {
          this.submitMessage = 'User not found ! please give the correct login userId';
        }
        else
        {
          console.log(error);
          this.submitMessage = error.message;
        }
      });
  
}

}
