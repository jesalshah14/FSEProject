import { Component, OnInit } from '@angular/core';
import { Category } from '../category';
import { FormControl, Validators, RequiredValidator } from '@angular/forms';
import { CategoryService } from '../services/category.service';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  category: Category;
  categoryArr: Array<Category>=[];
  private errMessage: string;
  // name = new FormControl('', Validators.compose([Validators.required]));
  // description = new FormControl('', Validators.compose([Validators.required]));
name = new FormControl('');
  description = new FormControl('');
  constructor(private categoryService: CategoryService, private routerService: RouterService) {
  }

  ngOnInit() {
   
    this.errMessage='';
    this.category = new Category();
    this.categoryArr = [];
    this.categoryService.getAllCategoryByUserId();
    this.categoryService.getAllCategories().subscribe(result => {
      this.categoryArr = result;
     console.log('show category'+JSON.stringify(this.categoryArr));
    })
  }

  createCategory() {


    if(this.name.value ==''  || this.name.value ==''){
  // if (this.name.hasError('required') || this.description.hasError('required'))
    this.errMessage = 'name and description required';
  } else {
    this.errMessage = '';
console.log('required -'+this.name.value);
    this.category.Name = this.name.value;
    this.category.Description = this.description.value;
    this.categoryService.createCategory(this.category).subscribe(value => {
    
      this.categoryArr.push(value);
      this.name.reset();
      this.description.reset();
console.log('created category'+JSON.stringify(this.categoryArr));
    
    }
    ,error=>{

      debugger;
      if (error.status === 409) {
        this.errMessage = 'Unauthorized User, Please Sign Up';
      }
    else {
      this.errMessage = 'Invalid user details';
      }
    });
  }
  }

  deleteCategory(categoryId) {
    debugger;
    this.categoryService.deleteCategory(categoryId).subscribe(result => {
      const index = this.categoryArr.findIndex(ele => ele.Id == categoryId);
      debugger;
      this.categoryArr.splice(index, 1);
    });
    this.routerService.routeToCategory();
  }

  updateCategory(categoryId) {
    debugger;
    this.routerService.routeToEditCategoryView(categoryId);
  }



}
