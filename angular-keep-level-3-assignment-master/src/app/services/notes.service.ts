import { Injectable } from '@angular/core';
import { Note } from '../note';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';
import { RouterService } from './router.service';

@Injectable()
export class NotesService {
  public url = 'http://localhost:8082/api/notes';
  notes: Array<Note> = [];
  //hot observable
  notesSubject: BehaviorSubject<Array<Note>> = new BehaviorSubject(this.notes);

  token: any;

  constructor(private httpClient: HttpClient, private authService: AuthenticationService,
    private router: RouterService) {
    this.fetchNotesFromServer();
  }

  fetchNotesFromServer() {
    const bearerToken = this.authService.getBearerToken();
    const userId = this.authService.getUserId();
    this.httpClient.get<Array<Note>>(`${this.url}/${userId}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${bearerToken}`)
    }).subscribe(data => {
      this.notes = data;
      this.notesSubject.next(this.notes);
    },
      (err) => {
        this.router.routeToLogin();
      });
  }

  getNotes(): BehaviorSubject<Array<Note>> {
    return this.notesSubject;
  }

  addNote(note: Note): Observable<Note> {
    const bearerToken = this.authService.getBearerToken();
    const userId = this.authService.getUserId();
    note.CreatedBy = userId;
    // console.log('add note - service'+JSON.stringify(note));
    console.log("jes");
    return this.httpClient.post<Note>(`${this.url}/${userId}`, note, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${bearerToken}`)
    })
    // .pipe(tap(addedNote => {
    //   this.notes.push(addedNote);
    //   this.notesSubject.next(this.notes);
    // })
    // );
  }

  editNote(Id, note: Note): Observable<Note> {
    const bearerToken = this.authService.getBearerToken();
    const userId = this.authService.getUserId();
    //console.log('note id -'+Id + JSON.stringify(note));
    return this.httpClient.put<Note>(`${this.url}/${userId}/${Id}`, note, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${bearerToken}`)
    })
  }



  getNoteById(noteId): any {
    // const selectedNote = this.notes.find(x => x.id === noteId);
    // return selectedNote;

    const bearerToken = this.authService.getBearerToken();
    const userId = this.authService.getUserId();
    return this.httpClient.get<Note>(`${this.url}/${userId}`,
      { headers: new HttpHeaders().set('Authorization', `Bearer ${bearerToken}`) }
    );
  }


  deleteNote(noteId): any {
    const bearerToken = this.authService.getBearerToken();
    const userId = this.authService.getUserId();
    return this.httpClient.delete<any>(`${this.url}/${userId}/${noteId}`,
      { headers: new HttpHeaders().set('Authorization', `Bearer ${bearerToken}`) });
  }


}
