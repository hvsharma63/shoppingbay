import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-product-index',
  templateUrl: './product-index.component.html',
  styleUrls: ['./product-index.component.css']
})
export class ProductIndexComponent implements OnInit, OnDestroy {
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  error: any;
  success: string;
  constructor(private productService: ProductsService) { }

  products = [];
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5
    };
    this.productService.getAllProducts().subscribe(products => {
      this.products = products;
      this.dtTrigger.next();
      console.log(this.products);
    });

  }
  deleteProduct(id: number) {
    const decision = confirm('Are you sure you want to delete?');
    if (decision) {
      this.productService.deleteProduct(id).subscribe(res => {
        console.log(res);
        this.success = 'Product Deleted Successfully';

      }, err => {
        console.log(err);
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
