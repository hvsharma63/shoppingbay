import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserDetails } from 'src/app/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  details: UserDetails;
  constructor(private auth: AuthenticationService) { }

  ngOnInit() {
    this.auth.profile().subscribe(
      user => {
        this.details = user;
        // console.log(user);
      },
      err => {
        console.error(err);
      }
    );

  }

}
