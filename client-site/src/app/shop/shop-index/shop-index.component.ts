import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/products.service';

@Component({
  selector: 'app-shop-index',
  templateUrl: './shop-index.component.html',
  styleUrls: ['./shop-index.component.css']
})
export class ShopIndexComponent implements OnInit {

  products = [];
  constructor(private productsService: ProductService) { }
  filteredOption;
  ngOnInit() {
    this.productsService.selectedFilter.subscribe(res => {
      this.filteredOption = res;
      this.getAllProducts();
    });
  }
  getAllProducts() {
    this.productsService.getAllProductsForShopping(this.filteredOption)
      .subscribe(res => {
        this.products = res;
        console.log(res);
      });
  }
}
