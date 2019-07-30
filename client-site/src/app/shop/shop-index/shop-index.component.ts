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

  ngOnInit() {
  }
  getAllProducts() {
    this.productsService.getAllProducts()
      .subscribe(res => {
        this.products = res;
      });
  }
}
