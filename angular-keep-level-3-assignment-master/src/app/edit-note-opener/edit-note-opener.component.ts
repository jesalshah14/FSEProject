import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { RouterService } from '../services/router.service';
import { EditNoteViewComponent } from '../edit-note-view/edit-note-view.component';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-edit-note-opener',
  templateUrl: './edit-note-opener.component.html',
  styleUrls: ['./edit-note-opener.component.css']
})
export class EditNoteOpenerComponent implements OnInit {
  Id: number;
  note: Note;
  constructor(private dialog: MatDialog, private actiavtedRoute: ActivatedRoute,
     private routerService: RouterService, private noteService:NotesService) {

    const id = +this.actiavtedRoute.snapshot.paramMap.get('noteId');
    console.log(id);
    // this.dialog.open(EditNoteViewComponent, {
    //   data: {
    //     noteId : id
    //   }
    // }).afterClosed().subscribe(result => {
    //   this.routerService.routeBack();
    // });

    this.actiavtedRoute.params.subscribe(param => this.Id = param.noteId);
  console.log('note id update -'+this.Id);
     this.noteService.getNoteById(this.Id).subscribe(res => {
       this.note = res.filter(_note => (_note.id == this.Id));
    console.log('note details for update'+this.Id+JSON.stringify(res))
      console.log('single note details for update'+this.Id+JSON.stringify(this.note)) 
       this.dialog.open(EditNoteViewComponent, {
         data: this.note
       }).afterClosed().subscribe(result => {
         this.routerService.routeBack();
       });
     });




  }

  ngOnInit() {

   
  }
}
