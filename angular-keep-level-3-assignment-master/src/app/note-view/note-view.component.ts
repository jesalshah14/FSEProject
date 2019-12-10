import { Component, OnInit } from '@angular/core';
import { Note } from './../note';
import { NotesService } from './../services/notes.service';

@Component({
  selector: 'app-note-view',
  templateUrl: './note-view.component.html',
  styleUrls: ['./note-view.component.css']
})
export class NoteViewComponent implements OnInit {
  note: Note = new Note();

  errMessage: string;

//iniitial blank array
notes: Array<Note> = [];
//now i can saay http client instane injected over here 
constructor(private noteservice: NotesService) {
}

//components goes through varios stages lifestyle hook
// after the componrnt get constructed it gets initialised 
  ngOnInit() {
    this.noteservice.getNotes().subscribe(
      result => {  console.log(result); this.notes = result; }
      , err => { this.errMessage = err.errMessage;    console.log(err); }
    );
  }
}






