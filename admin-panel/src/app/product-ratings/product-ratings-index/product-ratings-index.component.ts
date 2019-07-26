import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-product-ratings-index',
  templateUrl: './product-ratings-index.component.html',
  styleUrls: ['./product-ratings-index.component.css']
})
export class ProductRatingsIndexComponent implements OnInit, OnDestroy {
  success: string;

  constructor(private productService: ProductsService) { }

  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  ratings = [];
  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5
    };
    this.productService.getAllProductsRating().subscribe(res => {
      this.ratings = res;
      this.dtTrigger.next();
    });
  }
  deleteRating(id: number) {
    const decision = confirm('Are you sure you want to delete?');
    if (decision) {
      this.productService.deleteProductsRating(id).subscribe(res => {
        this.success = 'Ratings Deleted Successfully';
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
