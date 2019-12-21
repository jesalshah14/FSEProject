// export class Note {
//   id: Number;
//   title: string;
//   text: string;
//   state: string;






 
  import { Category } from "./category";
  import { Reminder } from "./reminder";
  
  export class Note {
    Id: Number;
    Title: string;
    Content: string;
  Status: string;
    CreationDate: string;
    CreatedBy: string;
    category: Category;
    Reminders: Reminder;
    
    constructor() {
      this.Title = '';
      this.Content = '';
    this.Status = 'not-started';
    }
    }
    