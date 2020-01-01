import { Component, Input } from '@angular/core';
import { RouterService } from '../services/router.service';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent {

  // data inputed 
  @Input() note: Note;

  constructor(private routerService: RouterService, private noteService: NotesService) {

  }

  ngOnInit() { }

  openEditView(noteId: number) {
    this.routerService.routeToEditNoteView(noteId);
  }

  deleteNote(noteId: number) {
    this.noteService.getNoteById(noteId).subscribe(result => {
      result;
    })
    this.noteService.deleteNote(noteId).subscribe(response => {
      console.log(response)
      this.noteService.fetchNotesFromServer();
      //this.noteService.getNotes();
      /// location.reload();
    },
      (err) => {
     
        if (err.status === 404) {
          console.log('Note id not found!');
        }
        else {
          console.log('Session expired please login again!');
        }
      });
    }
  }