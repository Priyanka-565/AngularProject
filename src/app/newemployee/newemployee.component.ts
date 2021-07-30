import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Emp } from '../emp';
import {EmployeeService} from '../employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-newemployee',
  templateUrl: './newemployee.component.html',
  styleUrls: ['./newemployee.component.css']
})
export class NewemployeeComponent implements OnInit {

  @Output() public employeeAdded = new EventEmitter<Emp>();


  employeeForm : FormGroup;
  constructor(public empSvc : EmployeeService, public router : Router) { }
  employee : Emp ={
  id : 0,
  employeeName : '',
  Salary : 0,
  dept : '',
  gender: 'F'
  }
  ngOnInit(): void {

    this.employeeForm = new FormGroup({
      id: new FormControl(null),
      employeeName: new FormControl(null,[Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      Salary: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(15000000)]),
      dept:new FormControl('HR'),
      gender:new FormControl('F')
    })}

    OnCancel()
    {
      //this.router.routeReuseStrategy.shouldReuseRoute = () => false
      this.router.navigate(['/employee/']);
    }
  onFormSubmit() : void
  {
    if(this.employeeForm.valid)
    {
      const data : Emp = {
        id: this.employeeForm.get('id').value,
        employeeName: this.employeeForm.get('employeeName').value,
        Salary: this.employeeForm.get('Salary').value,
        dept: this.employeeForm.get('dept').value,
        gender: this.employeeForm.get('gender').value,
      }
    this.empSvc.create(data)
      .subscribe(
        response => {
          // console.log(response);
          this.router.routeReuseStrategy.shouldReuseRoute = () => false
          this.router.navigate(['employee']);
          //this.employeeAdded.emit(data);
        },
        error =>
        {
          console.log(error);
        }
      )
  }
}
}
