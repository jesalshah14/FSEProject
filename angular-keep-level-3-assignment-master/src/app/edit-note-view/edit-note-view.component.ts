import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-edit-note-view',
  templateUrl: './edit-note-view.component.html',
  styleUrls: ['./edit-note-view.component.css']
})
export class EditNoteViewComponent implements OnInit {
  // userID: string;
  // UserName:string;
  note: Note;
  states: Array<string> = ['not-started', 'started', 'completed'];
  errMessage: string;

  constructor(private dialogRef: MatDialogRef<EditNoteViewComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private noteService: NotesService) {
  }

  ngOnInit() {
    this.note = this.noteService.getNoteById(this.data.noteId);
   
      // this.userID = localStorage.getItem('userId');
      // this.UserName=localStorage.getItem('UserName');
     
    
  }
  //Id:number;
  // onSave() {
  //   this.noteService.editNote(this.note).subscribe(response => {
  //     this.dialogRef.close();
  //   },
  //     err => {
  //       if (err.status === 404) {
  //         this.errMessage = err.message;
  //       } else {
  //         this.errMessage = err.error.message;
  //       }
  //     });
  // }
}
