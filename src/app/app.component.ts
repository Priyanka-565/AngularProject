import { Component, OnInit } from '@angular/core';
import { LoginsvcService} from './loginsvc.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'AngularTrainingProject';
  isAuthenticated = false;

constructor(public loginSvc : LoginsvcService){
  this.loginSvc.isAuthenticated.subscribe(
    (authenticated: boolean) => this.isAuthenticated = authenticated
  );
}

async ngOnInit(): Promise<void>
{
  this.isAuthenticated = this.loginSvc.CheckAuthentication();

}

LogOut()
{
  this.loginSvc.LogOut();
  //this.isAuthenticated = this.loginSvc.CheckAuthentication();
}

}
