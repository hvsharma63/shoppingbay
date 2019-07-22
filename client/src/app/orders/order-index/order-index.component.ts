import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-order-index',
  templateUrl: './order-index.component.html',
  styleUrls: ['./order-index.component.css']
})
export class OrderIndexComponent implements OnInit, OnDestroy {
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  constructor(private orderService: OrdersService) { }
  orders = [];
  singleOrders = [];
  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5
    };
    this.orderService.getAllOrders().subscribe(res => {
      this.orders = res;
      this.dtTrigger.next();
    });
  }
  getOrderId(id: number) {
    console.log(id);
    this.orderService.getSingleOrderDetails(id).subscribe(resp => {
      this.singleOrders = resp;
    });
  }
  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
