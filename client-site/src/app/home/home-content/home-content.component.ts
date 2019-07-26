import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/products.service';
import { CategoryService } from 'src/app/services/categories.service';
@Component({
  selector: 'app-home-content',
  templateUrl: './home-content.component.html',
  styleUrls: ['./home-content.component.css']
})
export class HomeContentComponent implements OnInit {

  searchResult: any;
  constructor(private productsService: ProductService, private categoryService: CategoryService) { }
  categories = [];
  ngOnInit() {
    this.getLatestCategories();
  }

  getAllProducts() {

  }

  getLatestCategories() {
    this.categoryService.getLatestCategories()
      .subscribe(res => this.categories = res);
  }
  searchProduct(searchTerm) {
    this.productsService.searchEntries(searchTerm)
      .subscribe(res => this.searchResult = res);
    console.log(this.searchResult);
  }
}
