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
    ///this.note = this.noteService.getNoteById(this.data.noteId);
   
      // this.userID = localStorage.getItem('userId');
      // this.UserName=localStorage.getItem('UserName');
     
    
  }



  onSave(Id:number) {

//this.note = this.noteTakerForm.value;
    // console.log('reminders - '+JSON.stringify( this.note.Reminders));
     //console.log('check reminders  - '+JSON.stringify(this.checkedReminders));
    //  if (this.checkedReminders != null && this.checkedReminders.length > 0) {
    //    this.note.Reminders = this.checkedReminders;
 
    //   console.log('reminder for update'+JSON.stringify(this.note.Reminders));
    //  }
    //  else {
    //    debugger;
    //    this.note.Reminders = null;
    //  }


     console.log('note for update'+JSON.stringify(this.note));
     this.noteService.editNote(Id,this.note).subscribe(res => {
      /// this.noteService.getNotes();

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
    // this.noteTakerForm.reset();
     //this.checkedReminders = [];
     this.dialogRef.close();

   }
 


  // onChange(reminder, event) {
  //   debugger;
  //   if (event.target.checked) {
  //     this.checkedReminders.push(reminder);
  //   }
  //   else if (!event.target.checked) {
  //     const index = this.checkedReminders.findIndex(rem => rem.Id === reminder.reminderId);
  //     this.checkedReminders.splice(index, 1);
  //     console.log("reminderjes" +JSON.stringify(this.checkedReminders));
  //   }
  // }




  // isChecked(Id: number,reminder:Reminder) {
  //   let checked = false;
  //  // console.log(this.data[0].reminders.length);
  //   if (this.data[0].reminders.length>0) {
  //   //  console.log('hi'+JSON.stringify(this.data[0].reminders));
  //     const editreminders =<EditReminder[]>this.data[0].reminders;
  //   //  console.log(editreminders);
  //     const note =  editreminders.find(rem => rem.id == Id);
  //   //  console.log(note);
    
  //     if (note != null) {
  //     //console.log('hi'+JSON.stringify(this.checkedReminders));
  //       const rem = this.checkedReminders.find(rem => rem.Id ==Id);
  //       if (rem == null) {

  //       console.log('this.checkedReminders'+JSON.stringify(this.checkedReminders));
  //       }
  //       else
  //       {
  //         console.log('hi hi');
  //       }
  //       checked = true;
  //     }
  //   }
  //   return checked;
  // }

}


// export class EditReminder {
//   id:number;
//   name:string;
//   description:string;
//   type:string;
//   createdBy:string;
//   creationDate:string;
// }
