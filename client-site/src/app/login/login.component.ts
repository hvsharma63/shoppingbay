import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

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
      email: new FormControl('jd@r.com', [Validators.required, Validators.email]),
      password: new FormControl('user123', [Validators.required]),
    });
  }
  onSubmit() {
    // tslint:disable-next-line: label-position
    if (!this.loginForm.valid) {
      return this.error = 'Something is wrong with your credentials, try again!';
    }
    const credentials = this.loginForm.value;
    this.auth.login(credentials).subscribe(
      () => {
        this.router.navigateByUrl('');
      },
      err => {
        console.log(err);
        if (err.message.includes('Unknown')) {
          this.error = 'Something went wrong';
        } else {
          this.error = err.error.message;
        }
      }
    );
  }
}
