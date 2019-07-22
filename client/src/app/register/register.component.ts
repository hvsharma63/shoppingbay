import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerationForm: FormGroup;
  password = '';
  error: any;
  success: string;
  constructor(private auth: AuthenticationService, private router: Router) { }
  userValidationMessages = {
    firstName: [
      { type: 'required', message: 'Required' },
      { type: 'minlength', message: 'Too short' },
      { type: 'maxlength', message: 'Too long' },
    ],
    lastName: [
      { type: 'required', message: 'Required' },
      { type: 'minlength', message: 'Too short' },
      { type: 'maxlength', message: 'Too long' },
    ],
    email: [
      { type: 'required', message: 'Required' },
      { type: 'email', message: 'Enter a proper E-mail' },
    ],
    dob: [
      { type: 'required', message: 'Required' }
    ],
    contact: [
      { type: 'required', message: 'Required' },
      { type: 'pattern', message: 'Should be Number' },
      { type: 'minlength', message: 'least 10 nums' }
    ],
    password: [
      { type: 'required', message: 'Required' }
    ],
    confirmPassword: [
      { type: 'required', message: 'Required' },
      { type: 'match', message: 'Password mismatch' }
    ],
    terms: [
      { type: 'required', message: 'You must accept terms and conditions' }
    ]
  };
  ngOnInit() {
    this.registerationForm = new FormGroup({
      firstName: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      lastName: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      dob: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      contact: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
      password: new FormControl(null, [Validators.required]),
      confirmPassword: new FormControl(null, [Validators.required, this.checkPassword.bind(this)]),
      terms: new FormControl(null, [Validators.required]),
    });
  }

  checkPassword(control: FormControl): { [s: string]: boolean } {
    if (control.value !== this.password) {
      return { match: false };
    }
    return null;
  }

  getPassword(password: string) {
    this.password = password;
  }

  onSubmit() {
    if (this.registerationForm.invalid) {
      return this.error = "Must fill all the fields"
    }
    this.registerationForm.value.role = 'user';
    // console.log(this.registerationForm.value);

    this.auth.register(this.registerationForm.value)
      .subscribe((response) => {
        console.log(response);
        this.success = "Registered Successfully";
      }
      );
  }
}
