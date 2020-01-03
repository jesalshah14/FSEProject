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

  errMessage: string;
  errMessage1: string;
  note: Note;
  notes: Note[];
  categories: Category[];
  Reminders: Reminder[];
  reminder:Reminder [];
  selectedReminders: Reminder[];
  noteTakerForm = this.formBuilder.group({
    title: [''],
    content: [''],
    category: [''],
    reminder: ['']

  })



  constructor(private formBuilder: FormBuilder, private notesService: NotesService,
    private categoryService: CategoryService,
    private reminderService: ReminderService, private authService: AuthenticationService) {
    this.errMessage = "";
    this.errMessage1 = "";
    this.note = new Note();
    this.notes = [];
    this.Reminders = [];
    this.categoryService.getAllCategoryByUserId();
    this.categoryService.getAllCategories().subscribe(res => {
      this.categories = res;
      //console.log(this.categories);
    })
    this.reminderService.getAllRemindersByUserId();
    this.reminderService.getAllReminders().subscribe(res => {
    this.Reminders = res;

      console.log('note taker reminder' + this.Reminders);
    })
    if (this.categories.length == 0 || this.Reminders.length == 0) {
      this.errMessage1 = "Note:to add new category/reminder,please add from menu";
    }
  }
  ngOnInit() {
  }



  takeNotes() {

    this.reminder = [];
    this.note = this.noteTakerForm.value;
    this.note.Status = 'not-started'
    //console.log('before note add '+JSON.stringify(this.noteTakerForm.value));
    //console.log('before note add '+JSON.stringify(this.note));
    this.errMessage = '';
    this.reminder= this.noteTakerForm.value['reminder'];
    this.note.Reminders = this.reminder;
    if (this.note.content === null || this.note.title === null ||
      this.note.content === '' || this.note.title === '') {
      this.errMessage = 'Title & Content fields are mandatory !';
    }
    else {
      this.notesService.addNote(this.note).subscribe(addnote => {
      this.notesService.fetchNotesFromServer();
        this.errMessage = "";
      },

        error => {
          console.log('note POST error' + error.errMessage);
        });
      //this.note = new Note();
    }
    this.noteTakerForm.reset();

  }
}
