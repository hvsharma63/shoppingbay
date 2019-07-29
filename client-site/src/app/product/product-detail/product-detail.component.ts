import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/products.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product = [];
  productRating = null;
  fullStar = null;
  fullStarArray = [];
  halfStar = null;
  halfStarArray = [];
  starOutline = null;
  starOutlineArray = [];
  constructor(private route: ActivatedRoute, private productService: ProductService) { }
  ngOnInit() {
    // tslint:disable-next-line: radix
    const pid = parseInt(this.route.snapshot.queryParamMap.get('pid'));
    this.productService.getProductById(pid).subscribe(res => {
      this.productRating = res.ratings;
      this.product = res;
      if (res.ratings !== undefined) {
        this.fullStar = Math.floor(this.productRating);
        this.halfStar = Math.ceil(this.productRating - this.fullStar);
        this.starOutline = Math.floor(5 - this.productRating);
        for (let index = 0; index < this.fullStar; index++) {
          this.fullStarArray.push(index);
        }
        for (let index = 0; index < this.halfStar; index++) {
          this.halfStarArray.push(index);
        }
        for (let index = 0; index < this.starOutline; index++) {
          this.starOutlineArray.push(index);
        }
        console.log(this.fullStarArray);
        console.log(this.halfStarArray);
        console.log(this.starOutlineArray);
      }
    });

  }



}
