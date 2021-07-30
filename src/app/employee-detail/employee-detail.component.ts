import { Component, OnInit } from '@angular/core';
import { Emp } from '../emp';
import { EmployeeService } from '../employee.service';
import { ActivatedRoute, Params, Router} from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {
  emp: Emp;
  constructor(private empSvc : EmployeeService, private activatedRouter : ActivatedRoute, private router : Router) {
    this.employeeEditForm = new FormGroup({
    id: new FormControl(null, [Validators.required]),
    employeeName: new FormControl(null,[Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
    Salary: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(15000000)]),
    dept:new FormControl('HR'),
    gender:new FormControl('F')
  }) ;}
  employeeEditForm : FormGroup;

  ngOnInit(): void {



  //  const id = this.activatedRouter.snapshot.params['id'];
  //  this.emp = this.empSvc.getEmployeeById(id);

   //  const id = this.actRouter.snapshot.queryParams['empid'];
    //  this.empDetail = this.empServcie.getEmployeeById(id);



    this.activatedRouter.params.subscribe((param:  Params) => {
      this.empSvc.get(param['id']).subscribe(data => {
       // this.emp = data;
        this.employeeEditForm.patchValue(data);
        console.log(this.emp);
      });
    });

  }
  OnCancel()
  {
    this.router.navigate(['employee']);
  }
  onFormSubmit()
  {
//this.employeeEditForm.value;

this.empSvc.update(this.employeeEditForm.get('id').value, this.employeeEditForm.value).subscribe(
  response =>
  {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false
    this.router.navigate(['employee']);
    console.log(this.emp);
  },
  error =>
  {
    console.log(error);
  }
)
  }

}
