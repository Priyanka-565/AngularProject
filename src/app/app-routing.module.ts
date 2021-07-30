import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './auth-guard.service';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { EmployeeComponent } from './employee/employee.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NewemployeeComponent } from './newemployee/newemployee.component';

const routes: Routes = [
  {path:'', component: LoginComponent, pathMatch:'full'},
  {path:'home', component:HomeComponent, canActivate:[AuthGuardService]},
  {path:'login', component:LoginComponent},
  {path:'employee', component: EmployeeComponent, canActivate:[AuthGuardService],
    children:[
      {path:'new', component: NewemployeeComponent},
      {path:':id', component: EmployeeDetailComponent},

    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
