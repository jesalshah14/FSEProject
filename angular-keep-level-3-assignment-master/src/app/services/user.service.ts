import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../user';
import { Observable } from 'rxjs/Observable';
import { RouterService } from './router.service';
import { ok } from 'assert';

@Injectable()
export class UserService {

  public url = 'http://localhost:8084/api/User';

  constructor(private authService: AuthenticationService, private httpClient: HttpClient,

    private router: RouterService) { }

  createUser(user: User): Observable<User> {
   // const bearerToken = this.authService.getBearerToken();
   //console.log(this.url);
  // console.log(JSON.stringify(user));
   return this.httpClient.post<User>(`${this.url}`, user,
    //  { headers: new HttpHeaders().set('Authorization', `Bearer ${bearerToken}`) }
      );
     // console.log(this.url);
  }

  updateUser(user: User): Observable<User> {
    const bearerToken = this.authService.getBearerToken();
    const userId = this.authService.getUserId();
    return this.httpClient.put<User>(`${this.url}/${userId}`, user,
      { headers: new HttpHeaders().set('Authorization', `Bearer ${bearerToken}`) });
  }

  deleteUser(): any {
    const bearerToken = this.authService.getBearerToken();
    const userId = this.authService.getUserId();
    return this.httpClient.delete<any>(`${this.url}/${userId}`,
      { headers: new HttpHeaders().set('Authorization', `Bearer ${bearerToken}`) });
  }

  getUserById(userId): Observable<User> {
  
    const bearerToken = this.authService.getBearerToken();
    return this.httpClient.get<User>(`${this.url}/${userId}`,
     { headers: new HttpHeaders().set('Authorization', `Bearer ${bearerToken}`) }
      );
  }

    //   isuservalid(token:string){
    //     debugger;
    //     // http://localhost:8084/api/User/null
    //      let userId = this.authService.getUserId();
    //     return this.httpClient.get(`http://localhost:8084/api/User/${userId}`,
    //  { headers: new HttpHeaders().set('Authorization', `Bearer ${token}`) }
    //   ).map(response=> response['ok']).toPromise();
    //   }


}

