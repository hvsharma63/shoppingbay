import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  error: string;

  constructor(private auth: AuthenticationService, private router: Router) { }
  fp: FormGroup;

  fpValidationMessages = {
    email: [
      { type: 'required', message: 'Required' },
      { type: 'email', message: 'Enter a proper E-mail' },
    ],
  };
  ngOnInit() {
    this.fp = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
    });
  }
  onSubmit() {
    // tslint:disable-next-line: label-position
    if (!this.fp.valid) {
      return this.error = 'Something is wrong with your credentials, try again!';
    }
    const credentials = this.fp.value;
    this.auth.sendTokenToEmail(credentials).subscribe(res => {
      console.log(res);
    }, err => {
      console.log(err);
    }
    );
  }
}
