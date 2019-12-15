import { Component, OnInit, Inject } from '@angular/core';
import { RouterService } from '../services/router.service';
import { CategoryService } from '../services/category.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Category } from '../category';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-category-view',
  templateUrl: './edit-category-view.component.html',
  styleUrls: ['./edit-category-view.component.css']
})
export class EditCategoryViewComponent implements OnInit {
  private category: Category;
  errMessage: string;
  name = new FormControl('');
  description = new FormControl('');
  constructor(private dialog: MatDialogRef<EditCategoryViewComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private categoryService: CategoryService, private routerService: RouterService) {
    this.category = this.data;
  }

  ngOnInit() {
  }

  onSave(categoryId) {
    //console.log('updated category'+categoryId)

    // if(this.name.value == null  || this.description.value == null 
    //  || this.name.value == ''  || this.description.value == '' ){
  if (this.name.hasError('required') || this.description.hasError('required')){
    this.errMessage = 'name and description required !';
  } else {


    
    this.categoryService.updateCategory(categoryId,this.category).subscribe(res => {
     console.log('updated category'+res)
     this.categoryService.getAllCategoryByUserId();
      this.dialog.close();
    },
    (error) => {
      
     if (error.status === 404) {
       this.errMessage = 'categoryId  not found';
     }
     else
     {
       console.log(error);
       this.errMessage = error.message;
     }
   });
  }

}
}
