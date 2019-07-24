import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-alert-success',
  templateUrl: './alert-success.component.html',
  styleUrls: ['./alert-success.component.css']
})
export class AlertSuccessComponent implements OnInit {
  @Input() success: string;
  constructor() { }

  ngOnInit() {
  }

}
