import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-product-index',
  templateUrl: './product-index.component.html',
  styleUrls: ['./product-index.component.css']
})
export class ProductIndexComponent implements OnInit, OnDestroy {
  dtTrigger = new Subject();
  error: any;
  success: string;
  constructor(private productService: ProductsService) { }

  products = [];
  ngOnInit(): void {

    this.productService.getAllProducts().subscribe(products => {
      this.products = products;
      this.dtTrigger.next();
    });

  }
  deleteProduct(id: number) {
    const decision = confirm('Are you sure you want to delete?');
    if (decision) {
      this.productService.deleteProduct(id).subscribe(res => {
        this.success = 'Product Deleted Successfully';

      }, err => {
        this.error = err.error.error.sqlMessage;
      });
    } else {
      console.log('Nothing has changed');
    }
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
