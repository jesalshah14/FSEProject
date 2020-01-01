import { Component, OnInit } from '@angular/core';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-header-sub',
  templateUrl: './header-sub.component.html',
  styleUrls: ['./header-sub.component.css']
})
export class HeaderSubComponent implements OnInit {
  isNoteView = true;
  userID: string;
  UserName:string;
  constructor(private routerService: RouterService) { }

  ngOnInit() {
    this.userID = localStorage.getItem('userId');
    this.UserName=localStorage.getItem('UserName');
    // console.log('test'+this.UserName);
  }

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

  routeToUserDetails(){
    this.routerService.routeToUserDetails();
  }
  routeToCategory() {
    this.routerService.routeToCategory();
  }

  routeToReminder() {
    this.routerService.routeToReminder();
  }

  
  logoutUser() {
    localStorage.removeItem('bearerToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('UserName');
  this.userID='';

  this.UserName ='';
 
    this.routerService.routeToLogin();
    window.location.reload(); 
  }



}
