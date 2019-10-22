import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/products.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  url = '../../../assets/js/script.js';
  product = [];
  loadAPI: Promise<unknown>;
  constructor(private route: ActivatedRoute, private productService: ProductService, private cartService: CartService) { }
  ngOnInit() {

    this.loadAPI = new Promise(resolve => {
      console.log('resolving promise...');
      this.loadScript();
    });
    // tslint:disable-next-line: radix
    const pid = parseInt(this.route.snapshot.queryParamMap.get('pid'));
    this.productService.getProductById(pid).subscribe(res => {
      this.product = res;
      if (res.ratings !== undefined) {
      }
    });

  }

  addProductToCart(productId: any, quantity: number) {
    console.log(quantity);
    this.cartService.addProduct({ productId, quantity });
  }

  public loadScript() {
    console.log('preparing to load...');
    const node = document.createElement('script');
    node.src = this.url;
    node.type = 'text/javascript';
    node.async = true;
    // tslint:disable-next-line: deprecation
    node.charset = 'utf-8';
    document.getElementsByTagName('head')[0].appendChild(node);
  }

}
