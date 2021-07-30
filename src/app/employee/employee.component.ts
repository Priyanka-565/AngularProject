import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';
import { Emp } from '../emp';
// import { Employee } from '../employee';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  diplayColumns : string[] = ['id', 'employeeName', 'Salary', 'dept', 'gender', 'action']
  employees : Emp[];

  constructor(private empSvc: EmployeeService, private router : Router) { }

  ngOnInit(): void {
    this.reterieveEmployees();

  }

  reterieveEmployees() : void{
    this.empSvc.getAllEmployees()
      .subscribe(
        data => {
              this.employees = data;
              console.log(this.employees);
        },
        error => {
          console.log(error);
        });
  }

  EmployeeAdded()
  {
    this.reterieveEmployees();
  }

  edit(obj): void
  {
    this.router.navigate(["/employee/" + obj.id]);
  }
  delete(obj): void
  {
    if(obj != null)
    {
      if(confirm('Are you sure to delete this record?'))
      {
        this.empSvc.delete(obj.id).subscribe(response =>
        {
          console.log(response);
          this.reterieveEmployees();
        },
        error =>
        {
          console.log(error);
        })
      }
  }
  }
}

