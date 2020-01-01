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
  filternotes: Note[];
  private _searchTerm: string;

  //iniitial blank array
  notes: Array<Note> = [];

  // We are binding to this property in the view template, so this
  // getter is called when the binding needs to read the value
  get searchTerm(): string {
    return this._searchTerm;
  }

  // This setter is called everytime the value in the search text box changes
  set searchTerm(value: string) {
    this._searchTerm = value;
    this.filternotes = this.filterNotes(value);
  }


  filterNotes(searchString: string) {
    return this.notes.filter(note =>
      note.category.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  }

  //now i can saay http client instane injected over here 
  constructor(private noteservice: NotesService) {

  }

  //components goes through varios stages lifestyle hook
  // after the componrnt get constructed it gets initialised 
  ngOnInit() {
    this.noteservice.getNotes().subscribe(
      result => {
        console.log('Notes search', result); this.notes = result;


        this.filternotes = this.notes;
      }
      , err => { this.errMessage = err.errMessage; console.log(err); }
    );
  }
}






