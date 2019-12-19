import { Component, Input } from '@angular/core';
import { RouterService } from '../services/router.service';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent {
  
// data inputed 
  @Input() note: Note;
  
  constructor(private routerService: RouterService, private noteService:NotesService) { 

  }
  
  ngOnInit() {
    //console.log('oninit-'+JSON.stringify(this.note));
  

      }
    
      openEditView(noteId:number) {
        
         
        this.routerService.routeToEditNoteView(noteId);
      }
    
      deleteNote(noteId:number) {
      //  debugger;
        this.noteService.getNoteById(noteId).subscribe(result => {
           result;
         
        })


    //console.log(noteId+'-'+JSON.stringify(this.note));
        this.noteService.deleteNote(noteId).subscribe(response => {
        console.log(response)


        // const index = this.response.findIndex(note => note.id === this.note.Title);
        // this.notes.splice(index, 1);
        this.noteService.fetchNotesFromServer();
          },
          (err)=>{
      
           /// debugger;
            if (err.status === 404) {
            console.log('Note id not found!');
            }
          else {
            console.log('Session expired please login again!');
            }
          });
         /// this.routerService.r();
        }



      
      // openNoteReminderView(){
      //   this.routerService.routeToAddReminderView(this.note.Id);
      // }
    }
    

//   openEditView() {
//     this.routerService.routeToEditNoteView(this.note.Id);
//   }
// }
