import { Component, OnInit } from '@angular/core';
import { Reminder } from '../reminder';
import { ReminderService } from '../services/reminder.service';
import { RouterService } from '../services/router.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ReminderViewComponent } from '../reminder-view/reminder-view.component';

@Component({
  selector: 'app-edit-reminder-opener',
  templateUrl: './edit-reminder-opener.component.html',
  styleUrls: ['./edit-reminder-opener.component.css']
})
export class EditReminderOpenerComponent implements OnInit {

  Id: string;
  reminder: Reminder;
  constructor(private activateRoute: ActivatedRoute, private reminderService: ReminderService,
    private routerService: RouterService, private matdialog: MatDialog) {

    this.activateRoute.params.subscribe(param => this.Id = param.reminderId);
    this.reminderService.getReminderById(this.Id).subscribe(res => {
    ///  debugger;
      this.reminder = res;
      this.matdialog.open(ReminderViewComponent, {
        data: this.reminder
      }).afterClosed().subscribe(result => {
        this.routerService.routeBack();
      });
    });

  }

  ngOnInit() {
  }

}
