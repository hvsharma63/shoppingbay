import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-alert-danger',
  templateUrl: './alert-danger.component.html',
  styleUrls: ['./alert-danger.component.css']
})
export class AlertDangerComponent implements OnInit {


  @Input() error: string;
  constructor() { }

  ngOnInit() {

  }

}
