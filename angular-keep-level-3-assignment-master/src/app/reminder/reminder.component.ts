import { Component, OnInit } from '@angular/core';
import { Reminder } from '../reminder';
import { ReminderService } from '../services/reminder.service';
import { RouterService } from '../services/router.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.css']
})
export class ReminderComponent implements OnInit {


  reminder: Reminder;
  reminderArr: Array<Reminder> = [];
  private errMessage: string;
  name = new FormControl('', Validators.compose([Validators.required]));
  description = new FormControl('', Validators.compose([Validators.required]));
  type = new FormControl('', Validators.compose([Validators.required]));
  constructor(private reminderService: ReminderService, private routerService: RouterService) {
  }

  ngOnInit() {

    this.errMessage = '';
    this.reminder = new Reminder();
    this.reminderArr = [];
    this.reminderService.getAllRemindersByUserId();
    this.reminderService.getAllReminders().subscribe(result => {
      this.reminderArr = result;
      console.log('show reminder' + JSON.stringify(this.reminderArr));
    }, error => {
      if (error.status === 404) {
        
        this.errMessage = 'reminders not found !';
      }
      else {
        this.errMessage = 'Invalid details';
      }
    });


  }

  createReminder() {
    if (this.name.value == null || this.description.value == null || this.type.value == null
      || this.name.value == '' || this.description.value == '' || this.type.value == '') {
      this.errMessage = 'All fields are mandatory !';
    } else {
      this.errMessage = '';
      console.log('required -' + this.name.value);
      this.reminder.Name = this.name.value;
      this.reminder.Description = this.description.value;
      this.reminder.Type = this.type.value;
      this.reminderService.createReminder(this.reminder).subscribe(value => {

        this.reminderArr.push(value);

        this.name = new FormControl('');
        this.description = new FormControl('');
        this.type = new FormControl('');
        console.log('created reminder' + JSON.stringify(this.reminderArr));

      }
        , error => {
          if (error.status === 409) {
            this.errMessage = 'reminder already exist !';
          }
          else {
            this.errMessage = 'Session expired please login again!';
          }
        });
    }
  }

  deleteReminder(reminderId) {
    this.reminderService.deleteReminder(reminderId).subscribe(result => {
      const index = this.reminderArr.findIndex(ele => ele.Id === reminderId);
      this.reminderArr.splice(index, 1);
      this.reminderService.getAllRemindersByUserId();
    },
      (err) => {
        if (err.status === 404) {
          this.errMessage = 'Reminder id not found!';
        }
        else {
          this.errMessage = 'Session expired please login again!';
        }
      });
    this.routerService.routeToReminder();
  }

  updateReminder(reminderId) {
    this.routerService.routeToEditReminderView(reminderId);
  }



}
