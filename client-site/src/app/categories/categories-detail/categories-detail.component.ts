import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/categories.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-categories-detail',
  templateUrl: './categories-detail.component.html',
  styleUrls: ['./categories-detail.component.css']
})
export class CategoriesDetailComponent implements OnInit {
  categories = [];
  categoryName: string;
  ratings = false;
  constructor(private route: ActivatedRoute, private categoryService: CategoryService) { }

  ngOnInit() {
    // tslint:disable-next-line: radix
    const cid = parseInt(this.route.snapshot.queryParamMap.get('cid'));
    this.route.params.subscribe(res => this.categoryName = res.categoryName);
    this.categoryService.getAllProductsByCategoryID(cid).subscribe(res => {
      this.categories = res;
      this.ratings = true;
      console.log(res);
    }, err => {
      console.log(err);
    });
  }

}
