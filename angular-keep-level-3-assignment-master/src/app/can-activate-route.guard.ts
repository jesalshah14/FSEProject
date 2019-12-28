import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { RouterService } from './services/router.service';
import { AuthenticationService } from './services/authentication.service';
import { UserService } from './services/user.service';

@Injectable()
export class CanActivateRouteGuard implements CanActivate {

    constructor(private authService: AuthenticationService,
        private userService: UserService,

        private routeService: RouterService) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

            const bearerToken = this.authService.getBearerToken();
            const userId = this.authService.getUserId();
           
        //return true;

        // this.userService.isuservalid(bearerToken).then(data => {
        //     debugger;
        //     if  (data.status === 401) {
        //         this.routeService.routeToLogin();
        //     }

        //         return data;
        //     })
        //     .catch(error=>{
        //     console.log(" http://localhost:8084/api/User/null 401 (Unauthorized)"+error);
        // })
        // }

        // const employeexist = !!this.userService.getUserById(next.paramMap.get('userId'));
        // if (employeexist) {
        //     return true;
        //     console.log("canActivate" + true);
        // }
        // else {
        //     this.routeService.routeToLogin();
        //     return false;
        // }


        if(userId === null || bearerToken === null){
            this.routeService.routeToLogin();
          }
        else{
            return true;
        }
    }
}
