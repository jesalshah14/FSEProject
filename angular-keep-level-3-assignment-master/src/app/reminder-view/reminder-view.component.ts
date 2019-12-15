import { Component, OnInit, Inject } from '@angular/core';
import { Reminder } from '../reminder';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RouterService } from '../services/router.service';
import { ReminderService } from '../services/reminder.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-reminder-view',
  templateUrl: './reminder-view.component.html',
  styleUrls: ['./reminder-view.component.css']
})
export class ReminderViewComponent implements OnInit {

  private reminder: Reminder;
  errMessage: string;
  name = new FormControl('');
  description = new FormControl('');
  type = new FormControl('');
  constructor(private dialog: MatDialogRef<ReminderViewComponent>, 
    @Inject(MAT_DIALOG_DATA) private data: any,
    private reminderService: ReminderService,private routerService:RouterService) {
    this.reminder = this.data;
   // console.log( this.reminder);
  }

  onSave(Id) {
    if (this.name.hasError('required') || this.description.hasError('required'
    )|| this.type.hasError('required')){
      this.errMessage = 'name and description required !';
    }
    else {
    this.reminderService.updateReminder(Id,this.reminder).subscribe(res => {
      this.reminderService.getAllRemindersByUserId();
      
    this.dialog.close();
    },(error) => {
      if (error.status === 404) {
        this.errMessage = 'reminderId  not found';
      }
      else
      {
        console.log(error);
        this.errMessage = error.message;
      }
    });
  }
  }

  ngOnInit() {
  }

}
