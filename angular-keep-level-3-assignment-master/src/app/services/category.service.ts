

import { Injectable } from '@angular/core';
import { Category } from '../category';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { RouterService } from './router.service';
import { AuthenticationService } from './authentication.service';

import { Observable } from 'rxjs/Observable';



@Injectable()
export class CategoryService {
  public url = 'http://localhost:8081/api/Category';
  private categories: Category[];
  private categoryBehavior: BehaviorSubject<Array<Category>>;

  constructor(private httpClient: HttpClient, private authService: AuthenticationService,
    private router: RouterService) 
    {
    this.categories = [];
    this.categoryBehavior = new BehaviorSubject(this.categories);
  }

  createCategory(category: Category): Observable<Category> {
  
    const bearerToken = this.authService.getBearerToken();
    const userId = this.authService.getUserId();
    category.CreatedBy = userId;
    return this.httpClient.post<Category>(`${this.url}`, category,
      { 
        headers: new HttpHeaders().set('Authorization', `Bearer ${bearerToken}`) 
      }
      );
  }

  deleteCategory(categoryId): any {
   // debugger;
    const bearerToken = this.authService.getBearerToken();
    return this.httpClient.delete<any>(`${this.url}/${categoryId}`,
     { 
       headers: new HttpHeaders().set('Authorization', `Bearer ${bearerToken}`)
      }
     );
  }
//update category it passes id and category object
  updateCategory(Id:number ,category: Category): Observable<Category> {
    const bearerToken = this.authService.getBearerToken();
    const userId = this.authService.getUserId();
    category.CreatedBy = userId;

   // console.log('update category'+Id +JSON.stringify(category))
    return this.httpClient.put<Category>(`${this.url}/${Id}`, category,
      {
         headers: new HttpHeaders().set('Authorization', `Bearer ${bearerToken}`)
         }
      );
  }

  getAllCategoryByUserId() {
    ///debugger;
    const bearerToken = this.authService.getBearerToken();
    const userId = this.authService.getUserId();
    return this.httpClient.get<Array<Category>>(`${this.url}/${userId}`,
     { headers: new HttpHeaders().set('Authorization', `Bearer ${bearerToken}`) }
      
      
      ).subscribe(res => {
      //  debugger;
console.log('success -create category by userid');
        this.categories = res;
        this.categoryBehavior.next(this.categories);
      }, error => {
console.log('error -get category by userid');
        this.router.routeToLogin();
      });
  }

  getCategoryById(categoryId): Observable<Category> {

    const bearerToken = this.authService.getBearerToken();
    return this.httpClient.get<Category>(`${this.url}/${categoryId}`,
      { headers: new HttpHeaders().set('Authorization', `Bearer ${bearerToken}`) }
      );
  }

  getAllCategories(): BehaviorSubject<Array<Category>> {
    return this.categoryBehavior;
  }

}
