// export class Note {
//   id: Number;
//   title: string;
//   text: string;
//   state: string;



import { Category } from "./category";
import { Reminder } from "./reminder";

export class Note {
  Id: Number;
  title: string;
  content: string;
  Status: string;
  CreationDate: string;
  CreatedBy: string;
  category: Category;
  Reminders: Reminder;

  constructor() {
    this.title = '';
    this.content = '';
    this.Status = 'not-started';
  }
}
