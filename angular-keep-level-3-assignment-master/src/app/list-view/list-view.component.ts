import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {
  notes: Array<Note>;
  
  notStartedNotes: Array<Note>;
  startedNotes: Array<Note>;
  completedNotes: Array<Note>;

  constructor(private notesService: NotesService) { 

  }

  ngOnInit() {
    this.getData();
    // this.notesService.getNotes().subscribe(
    //   Notes => {
    //     this.notStartedNotes = Notes.filter(note => ('not-started' === note.Status));
    //     this.startedNotes = Notes.filter(note => ('started' === note.Status));
    //     this.completedNotes = Notes.filter(note => ('completed' === note.Status));
    //   },
    //   (err) => { }
    // );

   

  }

  getData() {
    this.notesService.fetchNotesFromServer();
    //console.log('list view');
    this.notesService.getNotes().subscribe(res => {

      this.notes=res;
debugger;
     //console.log('hi'+JSON.stringify( this.notes));
     const groupedNotes = this.groupby(res, 'status');
      const started = groupedNotes['started'];
      const notstarted = groupedNotes['not-started'];
      const completed = groupedNotes['completed'];
      this.startedNotes = started != null ? started : [];
      this.notStartedNotes = notstarted != null ? notstarted : [];
      this.completedNotes = completed != null ? completed : [];
    }
    ,err=>{
      console.log('error');
    }
    );
  }

  groupby(arr, state) {
    return arr.reduce(function (acc, obj) {
      const key = obj[state];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(obj);
      return acc;
    }, {});
  }
}
