import { Injectable } from '@angular/core';
import { Note } from '../note';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';

@Injectable()
export class NotesService {

  notes: Array<Note> = [];
  //hot observable
  notesSubject: BehaviorSubject<Array<Note>> = new BehaviorSubject(this.notes);

  token: any;

  constructor(private http: HttpClient, private authService: AuthenticationService) {
    this.fetchNotesFromServer();
  }

  fetchNotesFromServer() {
    this.token = this.authService.getBearerToken();
    this.http.get<Array<Note>>('http://localhost:3000/api/v1/notes', {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.token}`)
    }).subscribe(data => {
      this.notes = data;
      this.notesSubject.next(this.notes);
    },
      (err) => { });
  }

  getNotes(): BehaviorSubject<Array<Note>> {
    return this.notesSubject;
  }

  addNote(note: Note): Observable<Note> {

    console.log("jes");
    return this.http.post<Note>('http://localhost:3000/api/v1/notes', note, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.token}`)
    })
      .pipe(tap(addedNote => {
        this.notes.push(addedNote);
        this.notesSubject.next(this.notes);
      })
      );
  }

  editNote(note: Note): Observable<Note> {
    return this.http.put<Note>(`http://localhost:3000/api/v1/notes/${note.id}`, note, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.token}`)
    })
      .pipe(tap(edittedNote => {
        const selectedNote = this.notes.find((currentNote) => currentNote.id === edittedNote.id);
        Object.assign(selectedNote, edittedNote);
        this.notesSubject.next(this.notes);
      })
      );
  }

  getNoteById(noteId): Note {
    const selectedNote = this.notes.find(x => x.id === noteId);
    return selectedNote;
  }
}
