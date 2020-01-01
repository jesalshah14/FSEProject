import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { User } from '../user';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthenticationService {

  private authUrl = 'http://localhost:8085/api/auth';
  constructor(private http: HttpClient) { }


  public authenticateUser(user): Observable<any> {
    console.log(user);
    return this.http.post<any>(`${this.authUrl}/login`, user);
  }

  public createUser(user): Observable<User> {
    return this.http.post<any>(`${this.authUrl}/register`, user);
  }

  public setBearerToken(token) {
    localStorage.setItem('bearerToken', token);
  }

  public getBearerToken() {
    return localStorage.getItem('bearerToken');
  }

  public setUserId(userId: string) {
    localStorage.setItem('userId', userId);
  }
  public getUserId() {
    return localStorage.getItem('userId');
  }
  public setUserName(userName: string) {
    console.log(userName);
    localStorage.setItem('UserName', userName);
  }
  public getUserName() {
    return localStorage.getItem('UserName');
  }

}
