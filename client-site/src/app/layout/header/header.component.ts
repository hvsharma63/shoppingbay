import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(private cartService: CartService) { }
  private subscription: Subscription;
  totalProducts = 0;
  ngOnInit() {
    this.subscription = this.cartService.CartState
      .subscribe((res) => {
        console.log(res.products);
        this.totalProducts = res.products.length;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
