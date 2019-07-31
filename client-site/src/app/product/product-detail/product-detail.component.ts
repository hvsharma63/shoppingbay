import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product = [];
  constructor(private route: ActivatedRoute, private productService: ProductService) { }
  ngOnInit() {
    // tslint:disable-next-line: radix
    const pid = parseInt(this.route.snapshot.queryParamMap.get('pid'));
    this.productService.getProductById(pid).subscribe(res => {
      this.product = res;
      if (res.ratings !== undefined) {
      }
    });

  }



}
