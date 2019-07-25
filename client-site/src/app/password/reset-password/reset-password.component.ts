import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  email: any;
  rp: FormGroup;
  password: any;
  success: string;
  error: any;
  userId: any;
  constructor(private route: ActivatedRoute, private auth: AuthenticationService, private router: Router) { }
  ValidationMessages = {
    password: [
      { type: 'required', message: '|| Required ' },
      { type: 'caps', message: '|| Must have at-least 1 capital letter ' },
      { type: 'nums', message: '|| Must have at-least 1 number ' },
      { type: 'specs', message: '|| Must have at-least 1 special character ' }
    ],
    confirmPassword: [
      { type: 'required', message: '|| Required ' },
      { type: 'match', message: '|| Password mismatch' }
    ]
  };
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params.id;
      this.auth.checkTokenValidity(params.id, params.token)
        .subscribe(res => {
          console.log(res);
          if (res.isValid) {
            this.rp.patchValue({
              emailAddress: res.email
            });
          }
        }, err => {
          this.router.navigate(['/forgotPassword'], { queryParams: { isValid: false } });
        });

    });

    this.rp = new FormGroup({
      emailAddress: new FormControl(this.email),
      password: new FormControl(null, [Validators.required, this.validatePassword.bind(this)]),
      confirmPassword: new FormControl(null, [Validators.required, this.checkPassword.bind(this)]),

    });
  }
  validatePassword(control: FormControl): { [s: string]: boolean } {
    const capReg = new RegExp(/^(.*[A-Z]+.*)$/);
    const numReg = new RegExp(/^(.*[0-9]+.*)$/);
    const speReg = new RegExp(/^(.*[@#$%^&+*!=]+.*)$/);


    if (!capReg.test(control.value)) {
      return { caps: true };
    }
    if (!numReg.test(control.value)) {
      return { nums: true };
    }
    if (!speReg.test(control.value)) {
      return { specs: true };
    }
  }
  checkPassword(control: FormControl): { [s: string]: boolean } {
    if (control.value !== this.password) {
      return { match: true };
    } else {
      return null;
    }
  }
  getPassword(password: string) {
    this.password = password;
    this.rp.get('confirmPassword').setValue(null);
  }

  onSubmit() {
    if (this.rp.invalid) {
      return this.error = 'Must fill all the fields';
    }

    this.auth.resetPassword(this.userId, this.rp.get('emailAddress').value, this.rp.get('password').value)
      .subscribe(
        (response) => {
          this.success = response.message;
          setTimeout(() => {
            this.router.navigateByUrl('/login');
          }, 3);
        },
        (err) => {
          this.error = err.error.message;
        }
      );
  }
}
