import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get(`http://localhost:3000/categories/create`).subscribe(data => { console.log(data); });
  }


}
