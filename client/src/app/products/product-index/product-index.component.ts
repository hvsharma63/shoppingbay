import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductsService } from 'src/app/services/products.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-index',
  templateUrl: './product-index.component.html',
  styleUrls: ['./product-index.component.css']
})
export class ProductIndexComponent implements OnInit {

  constructor(private http: HttpClient, private productService: ProductsService, private router: ActivatedRoute) { }

  products = [];
  ngOnInit() {
    this.productService.getAllProducts().subscribe(products => {
      this.products = products;
      console.log(this.products);
    });

  }


}
