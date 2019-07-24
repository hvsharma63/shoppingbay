import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }
  id: any;
  token: any;
  payload: any;
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.token = params.token;

      if (this.token) {
        this.payload = this.token.split('.')[1];
        // console.log(payload);
        this.payload = window.atob(this.payload); // Decodes the poayload
        // console.log(payload);
        console.log((JSON.parse(this.payload).exp > (Date.now() / 1000)));
      }
    });
  }

}
