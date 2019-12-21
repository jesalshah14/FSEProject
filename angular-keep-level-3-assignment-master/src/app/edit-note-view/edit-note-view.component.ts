import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';
import { Category } from '../category';
import { FormBuilder } from '@angular/forms';
import { CategoryService } from '../services/category.service';
import { ReminderService } from '../services/reminder.service';
import { Reminder } from '../reminder';

@Component({
  selector: 'app-edit-note-view',
  templateUrl: './edit-note-view.component.html',
  styleUrls: ['./edit-note-view.component.css']
})
export class EditNoteViewComponent implements OnInit {
  // userID: string;
  // UserName:string;
  note: Note;
  status: Array<string> = ['not-started', 'started', 'completed'];
  errMessage: string;
  errMessage1: string;
  categories: Category[];
  reminders: Reminder[];
  checkedReminders = [];
  notes: Note[]
  addedReminders: Reminder[];
 

  // noteTakerForm = this.formBuilder.group({
  //   Title: [''],
  //   Content: [''],
  //   status:[''],
  //   category: [''],
  //   reminder: ['']
  // })


  constructor(private dialogRef: MatDialogRef<EditNoteViewComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private noteService: NotesService,private formBuilder: FormBuilder,
     private categoryService :CategoryService,
    private reminderService:ReminderService) {

      this.note = this.data[0];
 
      this.categoryService.getAllCategoryByUserId();
      this.categoryService.getAllCategories().subscribe(res=>{
        this.categories = res;
      //   debugger;
      // if (this.categories.length == 0)
      // {
      //   this.errMessage = "category list is empty, please add from menu";
        
      // // console.log('category is null'+ this.categories);
      // }   
      })

      this.reminderService.getAllRemindersByUserId();
      this.reminderService.getAllReminders().subscribe(res => {
        this.reminders = res;//.filter(reminder => reminder.CreatedBy == this.authService.getUserId());
        console.log('reminders - populate '+JSON.stringify(this.reminders));
         //   debugger;
      // if (this.reminders.length == 0)
      // {
      //   this.errMessage1 = "No reminders, please add from menu";
        
      // // console.log('category is null'+ this.categories);
      // } 
      })
  }

  ngOnInit() {
  }



  onSave(Id:number) {

    if (this.note.content === null || this.note.title === null||
      this.note.content === '' || this.note.title === '')
      {
      this.errMessage = 'Title & Content fields are mandatory !';
    }
    else {
     console.log('note for update'+JSON.stringify(this.note));
     this.noteService.editNote(Id,this.note).subscribe(res => {
   
   this.noteService.fetchNotesFromServer();
     }, error => {
      if (error.status === 404) {
                this.errMessage = error.message;
              } 
              if (error.status === 401) {
                this.errMessage = "Not authorized";
              }
              else {
                this.errMessage = error.error.message;
              }
     });
     this.dialogRef.close();
    }
    // this.noteTakerForm.reset();
     //this.checkedReminders = [];

   }
 



}


