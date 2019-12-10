import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { User } from '../user';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthenticationService {

  private authUrl = 'http://localhost:8085/api/auth';
  constructor(private http: HttpClient) {}


  public authenticateUser(user):Observable<any> {
    console.log(user);
    return this.http.post<any>(`${this.authUrl}/login`, user);
  }

  public createUser(user):Observable<User>{
    return this.http.post<any>(`${this.authUrl}/register`, user);
  }

  public setBearerToken(token) {
    localStorage.setItem('bearerToken', token);
  }

  public getBearerToken() {
    return localStorage.getItem('bearerToken');
  }

  public setUserId(userId : string){
    localStorage.setItem('userId', userId);
  }
  public getUserId(){
    return localStorage.getItem('userId');
  }
  public setUserName(userName : string){
    localStorage.setItem('UserName', userName);
  }
  public getUserName(){
    return localStorage.getItem('UserName');
  }

}

 





//   authenticateUser(data) {
//     return this.http.post('http://localhost:3000/auth/v1/', data);
//   }
// //store token	
//   setBearerToken(token) {
//     localStorage.setItem('bearerToken', token);
//   }
//   //return token from local storage to pass to author service;

//   getBearerToken() {
//     return localStorage.getItem('bearerToken');
//   }

//   isUserAuthenticated(token): Promise<boolean> {
//     return this.http.post('http://localhost:3000/auth/v1/isAuthenticated', {}, {

//       headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)

//     }).map((res) => res['isAuthenticated'])

//       .toPromise();
//   }
// }
