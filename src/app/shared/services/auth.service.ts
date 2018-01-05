import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Constants} from '../constants';


@Injectable()
export class AuthService implements CanActivate {

  constructor(
        private constants : Constants,
        private router : Router) 
  {

  }
isAuthenticated(){
    const auth = JSON.parse(localStorage.getItem(this.constants.AUTH_KEY_NAME));
    return  (auth && auth.hasOwnProperty('AccessToken') && auth['AccessToken'].length > 1 );
  }
    
canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(!this.isAuthenticated())
        this.router.navigate(['/']);
    return this.isAuthenticated();
  }

  logOut(){
    localStorage.removeItem(this.constants.AUTH_KEY_NAME);
  }

}
 