import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/auth.service';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerationForm: FormGroup;
  password: any;
  error: any;
  success: any;
  todaysDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
  constructor(private auth: AuthenticationService) { }
  userValidationMessages = {
    firstName: [
      { type: 'required', message: '|| Required ' },
      { type: 'minlength', message: '|| Too short' },
      { type: 'maxlength', message: '|| Too long' },
    ],
    lastName: [
      { type: 'required', message: '|| Required ' },
      { type: 'minlength', message: '|| Too short' },
      { type: 'maxlength', message: '|| Too long' },
    ],
    email: [
      { type: 'required', message: '|| Required ' },
      { type: 'email', message: '|| Enter a proper E-mail' },
    ],
    dob: [
      { type: 'required', message: '|| Required ' },
      { type: 'match', message: '|| Date cannot be ahead of today' }
    ],
    contact: [
      { type: 'required', message: '|| Required ' },
      { type: 'pattern', message: '|| Should be Number' },
      { type: 'minlength', message: '|| least 10 nums' },
      { type: 'maxlength', message: '|| max 13 nums' }
    ],
    password: [
      { type: 'required', message: '|| Required ' },
      { type: 'caps', message: '|| Must have at-least 1 capital letter ' },
      { type: 'nums', message: '|| Must have at-least 1 number ' },
      { type: 'specs', message: '|| Must have at-least 1 special character ' }
    ],
    confirmPassword: [
      { type: 'required', message: '|| Required ' },
      { type: 'match', message: '|| Password mismatch' }
    ],
    terms: [
      { type: 'required', message: '|| You must accept terms and conditions' }
    ]
  };
  ngOnInit() {
    console.log(this.todaysDate);
    this.registerationForm = new FormGroup({
      firstName: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      lastName: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      dob: new FormControl(null, [Validators.required, this.validateDate.bind(this)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      // tslint:disable-next-line: max-line-length
      contact: new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
      password: new FormControl(null, [Validators.required, this.validatePassword.bind(this)]),
      confirmPassword: new FormControl(null, [Validators.required, this.checkPassword.bind(this)]),
      terms: new FormControl(null, [Validators.required]),
    });
  }
  validateDate(control: FormControl): { [s: string]: boolean } {
    if (control.value > this.todaysDate) {
      return { match: true };
    } else {
      return null;
    }
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
    this.registerationForm.get('confirmPassword').setValue(null);
  }

  onSubmit() {
    if (this.registerationForm.invalid) {
      return this.error = 'Must fill all the fields';
    }
    this.registerationForm.value.role = 'user';
    // console.log(this.registerationForm.value);

    this.auth.register(this.registerationForm.value)
      .subscribe(
        (response) => {
          this.success = 'Registered Successfully';
        },
        (err) => {
          console.log(err);
          this.error = err.error.message;
        }
      );
  }
}
