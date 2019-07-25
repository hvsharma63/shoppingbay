import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  error: string;
  succcess: string;
  success: any;

  constructor(private auth: AuthenticationService, private router: Router, private route: ActivatedRoute) { }
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

    if (this.route.snapshot.queryParamMap.get('isValid') === 'false') {
      this.error = 'Token Expired';
    } else {
      this.error = null;
    }
  }
  onSubmit() {
    // tslint:disable-next-line: label-position
    if (!this.fp.valid) {
      return this.error = 'Something is wrong with your credentials, try again!';
    }
    const credentials = this.fp.value;
    console.log(credentials);
    this.auth.sendTokenToEmail(credentials).subscribe(res => {
      console.log(res.message);
      this.success = res.message;
    }, err => {
      console.log(err);
      this.error = err.error.message;
    }
    );
  }
}
