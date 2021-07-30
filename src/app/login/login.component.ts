import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginsvcService } from '../loginsvc.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  public loginInvalid = false;
  public formSubmitAttempt = false;
  private returnUrl: string;
  public formStatus: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private loginSvc: LoginsvcService
  ) {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/home';

    this.form = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  async ngOnInit(): Promise<void> {
    if (await this.loginSvc.CheckAuthentication()) {
     await this.router.navigate([this.returnUrl]);
    }
  }

  async onSubmit(): Promise<void> {
    this.loginInvalid = false;
    this.formSubmitAttempt = false;
   if(this.form.valid)
    {
      try {

        const username = this.form.get('username')?.value;
        const password = this.form.get('password')?.value;

        if(this.loginSvc.ValidateUser(username, password))
        {
          this.router.navigate([this.returnUrl]);
        }
        else
        {
          this.loginInvalid = true;
        }
      } catch (err) {
        this.loginInvalid = true;
      }
    } else {
      this.formSubmitAttempt = true;
    }
  }
}
