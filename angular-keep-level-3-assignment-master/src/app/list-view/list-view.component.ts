import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {

  notStartedNotes: Array<Note>;
  startedNotes: Array<Note>;
  completedNotes: Array<Note>;

  constructor(private notesService: NotesService) { }

  ngOnInit() {
    this.notesService.getNotes().subscribe(
      Notes => {
        this.notStartedNotes = Notes.filter(note => ('not-started' === note.state));
        this.startedNotes = Notes.filter(note => ('started' === note.state));
        this.completedNotes = Notes.filter(note => ('completed' === note.state));
      },
      (err) => { }
    );
  }
}
