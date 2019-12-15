import { Injectable } from '@angular/core';
import { Reminder } from '../reminder';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from './authentication.service';
import { RouterService } from './router.service';

@Injectable()
export class ReminderService {
  public url = 'http://localhost:8083/api/reminder';
  private reminders: Reminder[];
  private reminderBehavior: BehaviorSubject<Array<Reminder>>;

  constructor(private httpClient: HttpClient, private authService: AuthenticationService,
     private router: RouterService) {
    this.reminders =  [];
    this.reminderBehavior = new BehaviorSubject(this.reminders);
   }
   
  createReminder(reminder: Reminder): Observable<Reminder>{
    const bearerToken = this.authService.getBearerToken();
    const userId = this.authService.getUserId();
    reminder.CreatedBy = userId;
    return this.httpClient.post<Reminder>(`${this.url}`, reminder,
      { headers: new HttpHeaders().set('Authorization', `Bearer ${bearerToken}`) });
   }   

  deleteReminder(reminderId): any{
    const bearerToken = this.authService.getBearerToken();
    return this.httpClient.delete<any>(`${this.url}/${reminderId}`,
    { headers: new HttpHeaders().set('Authorization', `Bearer ${bearerToken}`) });
  }

  updateReminder(Id:Number,reminder: Reminder): Observable<Reminder>{

   // console.log('reminder data for update'+Id+JSON.stringify(reminder));
    const bearerToken = this.authService.getBearerToken();
    const userId = this.authService.getUserId();
    reminder.CreatedBy = userId;
    return this.httpClient.put<Reminder>(`${this.url}/${Id}`, reminder,
      { headers: new HttpHeaders().set('Authorization', `Bearer ${bearerToken}`) }
      );
  }

  getReminderById(reminderId): Observable<Reminder>{

    const bearerToken = this.authService.getBearerToken();
    return this.httpClient.get<Reminder>(`${this.url}/${reminderId}`,
    { headers: new HttpHeaders().set('Authorization', `Bearer ${bearerToken}`) }
      );
  }

  getAllRemindersByUserId(){
   debugger;
    const bearerToken = this.authService.getBearerToken();
    const userId = this.authService.getUserId();
    if(userId === null || bearerToken === null){
      this.router.routeToLogin();
    }
   // console.log('get reminder by user id'+userId);
    return this.httpClient.get<Array<Reminder>>(`${this.url}/${userId}`,
    { headers: new HttpHeaders().set('Authorization', `Bearer ${bearerToken}`) }
    ).subscribe(res => {
      debugger;
      this.reminders = res;
    console.log('get reminder by user id'+userId+JSON.stringify(this.reminders));
      this.reminderBehavior.next(this.reminders);
     },error =>{
       console.log();
       this.router.routeToLogin();
     });
  }

  getAllReminders(): BehaviorSubject<Array<Reminder>>{
    return this.reminderBehavior;
  }
}