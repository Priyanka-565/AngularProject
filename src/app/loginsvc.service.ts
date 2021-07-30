import { Injectable } from '@angular/core';
import{ Login } from './login';
import {BehaviorSubject } from 'rxjs';
import { Router} from '@angular/router';

const users: Login[] = [{ name: 'test', password: 'test'},
                          {name:'test1', password:'test1'}];

@Injectable({
  providedIn: 'root'
})

export class LoginsvcService {
 constructor(public router : Router) { }

 public isAuthenticated = new BehaviorSubject<boolean>(false);
public isValid : boolean = false;

public CheckAuthentication()//: Promise<boolean>
{
  if(localStorage.getItem('CurrentUser') === null)
  {
    this.isValid = false;
  }
  else{
    this.isValid = true;
  }
   this.isAuthenticated.next(this.isValid);
  return  this.isValid;
}
async LogOut() : Promise<any>
{
  localStorage.removeItem('CurrentUser');
  await this.isAuthenticated.next(false);
  this.router.navigate(['/login']);
}

 public ValidateUser(name : string, passowrd: string) : any
 {
  const user = users.find(x => x.name === name && x.password === passowrd);
  if(!user)
  {
    return false;
  }
  this.isAuthenticated.next(true);
  localStorage.setItem('CurrentUser', JSON.stringify(user));
  return true;
 }
}
