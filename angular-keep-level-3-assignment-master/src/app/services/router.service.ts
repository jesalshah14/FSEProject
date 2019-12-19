import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { e } from '@angular/core/src/render3';

@Injectable()
export class RouterService {

  constructor(private router: Router, private location: Location) { }

  routeToDashboard() {
    this.router.navigate(['dashboard']);
  }

  routeToLogin() {
    this.router.navigate(['login']);
  }

  routeToSignUp() {
    
    this.router.navigate(['signup']);
  }

  routeToEditUserView(userId){
    console.log(userId);
    this.router.navigate(['user/edit',userId]);
  }

  routeToUserDetails(){
    this.router.navigate(['user']);
  }

  routeToUser() {
    this.router.navigate(['user']);
  }

routeToCategory() {
    this.router.navigate(['category']);
  }

  routeToReminder() {
    this.router.navigate(['reminder']);
  }

  routeToEditCategoryView(categoryId) {
    this.router.navigate(['category', {
      outlets: {
        categoryEditOutlet: ['category', categoryId, 'edit']
      }
    }]);
  }

  routeToEditReminderView(reminderId) {
    this.router.navigate(['reminder', {
      outlets: {
        reminderEditOutlet: ['reminder', reminderId, 'edit']
      }
    }]);
  }

  
  routeToEditNoteView(noteId) {
    this.router.navigate([
      'dashboard', {
        outlets: {
          noteEditOutlet: ['note', noteId, 'edit']
        }
      }
    ]);
  }


  routeToAddReminderView(noteId){
    this.router.navigate(['dashboard', {
      outlets: {
        noteReminderOutlet: ['note', noteId, 'addreminder']
      }
    }]);
  }

  routeToNoteView() {
    this.router.navigate(['dashboard/view/noteview']);
  }

  routeToListView() {
    this.router.navigate(['dashboard/view/listview']);
  }

  routeBack() {
    this.location.back();
  }

}
