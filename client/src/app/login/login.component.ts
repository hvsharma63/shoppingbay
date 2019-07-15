import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService, TokenPayload } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // credentials: TokenPayload = {
  //   id: 0,
  //   firstName: '',
  //   lastName: '',
  //   dob: '',
  //   contact: '',
  //   email: '',
  //   password: '',
  //   role: ''
  // };
  error = null;
  constructor(private auth: AuthenticationService, private router: Router) { }
  loginForm: FormGroup;
  loginValidationMessages = {
    email: [
      { type: 'required', message: 'Required' },
      { type: 'email', message: 'Enter a proper E-mail' },
    ],
    password: [
      { type: 'required', message: 'Required' }
    ]
  };
  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('hvsharma63@gmail.com', [Validators.required, Validators.email]),
      password: new FormControl('admin123', [Validators.required]),
    });
  }
  onSubmit() {
    // tslint:disable-next-line: label-position
    const credentials = this.loginForm.value;
    this.auth.login(credentials).subscribe(
      () => {
        this.router.navigateByUrl('admin/dashboard');
      },
      err => {
        console.log(err.error.text);
        this.error = err.error.text;
      }
    );
  }
}
