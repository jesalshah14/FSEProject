import { Component } from '@angular/core';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isNoteView = true;
  userID: string;
  UserName:string;
  constructor(private routerService: RouterService) { }

  switchToListView() {
    this.isNoteView = false;
    this.routerService.routeToListView();
    this.userID = localStorage.getItem('userId');
    this.UserName=localStorage.getItem('UserName');
  }

  switchToNoteView() {
    this.isNoteView = true;
    this.routerService.routeToNoteView();
    this.userID = localStorage.getItem('userId');
    this.UserName=localStorage.getItem('UserName');
  }

  // routeToUserDetails(){
  //   this.routerService.routeToUserDetails();
  // }

  logoutUser() {
    localStorage.removeItem('bearerToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('UserName');
  this.userID='';
 // window.location.reload(); 
    this.routerService.routeToLogin();
  }



}
