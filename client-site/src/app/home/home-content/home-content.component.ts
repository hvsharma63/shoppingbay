import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/products.service';
import { CategoryService } from 'src/app/services/categories.service';
import { AuthenticationService } from 'src/app/services/auth.service';
import { map, tap, filter } from 'rxjs/operators';
@Component({
  selector: 'app-home-content',
  templateUrl: './home-content.component.html',
  styleUrls: ['./home-content.component.css']
})
export class HomeContentComponent implements OnInit {

  searchResult: any;
  isLoggedIn = false;
  // tslint:disable-next-line: max-line-length
  constructor(private productsService: ProductService, private categoryService: CategoryService,
    // tslint:disable-next-line: align
    private authService: AuthenticationService) { }
  categories = [];
  products = [];
  discountedProducts = [];
  ngOnInit() {
    this.getLatestCategories();
    this.getAllProducts();
    this.isLoggedIn = this.authService.isLoggedIn();
    this.getAllDiscountedProducts();
  }

  getAllProducts() {
    this.productsService.getAllProducts()
      .subscribe(res => this.products = res);
  }

  getAllDiscountedProducts() {

    this.productsService.getAllProducts()
      .pipe(
        map(data => {
          data.forEach(product => {
            if (product.discount) {
              this.discountedProducts.push(product);
            }
          }
          );
          return this.discountedProducts;
        }))
      // tslint:disable-next-line: deprecation
      .subscribe();
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
