import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private subscription: Subscription;
  constructor(private cartService: CartService) { }
  totalProducts = 0;
  ngOnInit() {
    this.subscription = this.cartService.CartState
      .subscribe((res) => {
        this.totalProducts = res.products.length;
      });
  }

}
