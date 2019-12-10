import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { RouterService } from '../services/router.service';
import { EditNoteViewComponent } from '../edit-note-view/edit-note-view.component';

@Component({
  selector: 'app-edit-note-opener',
  templateUrl: './edit-note-opener.component.html',
  styleUrls: ['./edit-note-opener.component.css']
})
export class EditNoteOpenerComponent implements OnInit {
  constructor(private dialog: MatDialog, private actiavtedRoute: ActivatedRoute, private routerService: RouterService) {

    const id = +this.actiavtedRoute.snapshot.paramMap.get('noteId');
    this.dialog.open(EditNoteViewComponent, {
      data: {
        noteId : id
      }
    }).afterClosed().subscribe(result => {
      this.routerService.routeBack();
    });
  }

  ngOnInit() {
  }
}
