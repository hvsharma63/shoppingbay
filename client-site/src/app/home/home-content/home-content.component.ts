import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/products.service';
import { CategoryService } from 'src/app/services/categories.service';
import { AuthenticationService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
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
    private authService: AuthenticationService, private cartService: CartService) { }
  categories = [];
  products = [];
  discountedProducts = [];
  recentViewedProducts = [];
  ngOnInit() {
    this.getLatestCategories();
    this.getAllProducts();
    this.isLoggedIn = this.authService.isLoggedIn();
    this.getAllDiscountedProducts();
    if (this.isLoggedIn) {
      this.getRecentViewProducts();
    }
  }

  getAllProducts() {
    this.productsService.getAllProducts()
      .subscribe(res => {
        this.products = res;
      });
  }

  getAllDiscountedProducts() {
    this.productsService.getAllDiscountedProducts()
      .subscribe(res => {
        this.discountedProducts = res;
        console.log(res);
      });
  }

  getLatestCategories() {
    this.categoryService.getLatestCategories()
      .subscribe(res => this.categories = res);
  }

  getRecentViewProducts() {
    this.productsService.getRecentlyViewedProducts()
      .subscribe(res => {
        this.recentViewedProducts = res;
      });
  }

  searchProduct(searchTerm) {
    this.productsService.searchEntries(searchTerm)
      .subscribe(res => this.searchResult = res);
  }

  addProductToCart(productId) {
    this.cartService.addProduct(productId);
  }
}
