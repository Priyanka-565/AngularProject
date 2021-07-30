import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { LoginsvcService} from './loginsvc.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public loginSvc : LoginsvcService, public router: Router) { }

  async canActivate() : Promise<boolean>
  {
    if(!await this.loginSvc.CheckAuthentication())
    {
      await this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
