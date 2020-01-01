import { Component, OnInit } from '@angular/core';
import { Note } from './../note';
import { NotesService } from './../services/notes.service';
import { Reminder } from '../reminder';
import { Category } from '../category';
import { FormBuilder } from '@angular/forms';
import { ReminderService } from '../services/reminder.service';
import { AuthenticationService } from '../services/authentication.service';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-note-taker',
  templateUrl: './note-taker.component.html',
  styleUrls: ['./note-taker.component.css']
})
export class NoteTakerComponent implements OnInit {

  // note: Note = new Note();
  // notes: Array<Note> = [];

  
  errMessage: string;
  note: Note;
  notes: Note[];
  categories: Category[];
  Reminders: Reminder[];
 // checkedReminders: Reminder[];
  noteTakerForm = this.formBuilder.group({
    title: [''],
    content: [''],
    category: [''],
    Reminders: ['']
  })

  

  constructor(private formBuilder: FormBuilder, private notesService: NotesService, 
    private categoryService: CategoryService,
    private reminderService: ReminderService, private authService: AuthenticationService) {
      this.errMessage ="";
      this.note = new Note();
      this.notes = [];
      this.Reminders = [];
     // this.checkedReminders = [];
      this.categoryService.getAllCategoryByUserId();
      this.categoryService.getAllCategories().subscribe(res=>{
        this.categories = res;
  //console.log(this.categories);
      })
      this.reminderService.getAllRemindersByUserId();
      this.reminderService.getAllReminders().subscribe(res => {
        this.Reminders = res;
        
      console.log('note taker reminder'+  this.Reminders);
      })
    }
  ngOnInit() {
    // this.noteService.getNotes().subscribe(
    //   notes => { this.notes = notes; },
    //   err => { this.errMessage = err.errMessage; }
    // );
  }

  

  takeNotes(){

    this.note = this.noteTakerForm.value;
    this.note.Status = 'not-started'
//console.log('before note add '+JSON.stringify(this.noteTakerForm.value));
//console.log('before note add '+JSON.stringify(this.note));
this.errMessage = '';


    // if (!this.note.Reminders) {
    //   this.note.Reminders = null;
    // }

    // if (!this.note.category) {
    //   this.note.category = null;
    // }
    
    if (this.note.content === null || this.note.title === null||
      this.note.content === '' || this.note.title === '')
      {
      this.errMessage = 'Title & Content fields are mandatory !';
    }
    else {
      this.notesService.addNote(this.note).subscribe(addnote => {
      this.notesService.fetchNotesFromServer();
      
        this.errMessage ="";
      },
      
      error => {
       console.log('note POST error'+error.errMessage);
        // const index = this.notes.findIndex(note => note.Title === this.note.Title);
        // this.notes.splice(index, 1);
        // this.errMessage = 'Http failure response for http://localhost:8086/api/note: 404 Not Found';
      });
      //this.note = new Note();
    }
    this.noteTakerForm.reset();
   /// this.checkedReminders = [];

  }
}
