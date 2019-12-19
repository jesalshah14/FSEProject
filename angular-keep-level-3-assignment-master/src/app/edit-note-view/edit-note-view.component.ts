import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';
import { Category } from '../category';
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
  states: Array<string> = ['not-started', 'started', 'completed'];
  errMessage: string;
  categories: Category[];
  reminders: Reminder[];
  checkedReminders = [];
  constructor(private dialogRef: MatDialogRef<EditNoteViewComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private noteService: NotesService, private categoryService :CategoryService,
    private reminderService:ReminderService) {
      this.categoryService.getAllCategoryByUserId();
      this.categoryService.getAllCategories().subscribe(res=>{
        this.categories = res;
      console.log(this.categories);
      })
      // this.reminderService.getAllRemindersByUserId();
      // this.reminderService.getAllReminders().subscribe(res => {
      //   this.reminders = res;
        
      //   console.log('note taker reminder'+  this.reminders);
      // })
  }

  ngOnInit() {
    this.note = this.noteService.getNoteById(this.data.noteId);
   
      // this.userID = localStorage.getItem('userId');
      // this.UserName=localStorage.getItem('UserName');
     
    
  }
  //Id:number;
  // onSave() {
  //   this.noteService.editNote(this.note).subscribe(response => {
  //     this.dialogRef.close();
  //   },
  //     err => {
  //       if (err.status === 404) {
  //         this.errMessage = err.message;
  //       } else {
  //         this.errMessage = err.error.message;
  //       }
  //     });
  // }


  onChange(reminder, event) {
    if (event.target.checked) {
      this.checkedReminders.push(reminder);
    }
    else if (!event.target.checked) {
      const index = this.checkedReminders.findIndex(rem => rem.Id === reminder.reminderId);
      this.checkedReminders.splice(index, 1);
    }
  }
}
