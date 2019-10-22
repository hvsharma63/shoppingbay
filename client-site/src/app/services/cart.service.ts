import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from './auth.service';


@Injectable({
    providedIn: 'root'
})
export class CartService {
    private cartSubject = new Subject<any>();
    Products;
    isLoggedIn = false;
    loggedUserId = null;
    CartState = this.cartSubject.asObservable();
    constructor(private toastr: ToastrService, private http: HttpClient, private authService: AuthenticationService) {
        if (this.authService.isLoggedIn()) {
            this.isLoggedIn = this.authService.isLoggedIn();
            this.loggedUserId = this.authService.getUserDetails().id;
            this.http.get('/api/carts/all').subscribe(res => this.Products = res);
        }
    }

    addProduct(product: { productId: number, quantity: number }) {
        if (!this.checkIfExists(product)) { // false
            if (this.isLoggedIn) {
                // tslint:disable-next-line: no-string-literal
                product['userId'] = parseInt(this.loggedUserId, 10);
                this.http.post('/api/carts/create', product).subscribe(res => {
                    // tslint:disable-next-line: no-string-literal
                    product.productId = res['insertId'];
                    this.Products.push(product);
                });
            } else {
                this.Products.push(product);
            }
            this.cartSubject.next({ products: this.Products });
            this.toastr.success('Product Added to cart!');
        } else if (product.quantity === 1) {
            this.toastr.error('Product is already added to the cart');
        } else {
            this.toastr.success('Product Updated');
        }
        console.log(this.Products);

    }

    checkIfExists(product: { productId: number, quantity: number }): any {
        return this.Products.some((ele) => {
            if (ele.productId === product.productId) {
                if (product.quantity > 1) {
                    ele.quantity = product.quantity;
                }
                return true;
            } else {
                return false;
            }
        });
    }

    // removeProduct(id: number) {
    //     this.Products = this.Products.filter((item) => item.id !== id)
    //     this.cartSubject.next({ products: this.Products });
    // }

    // getAllProducts(): Observable<any> {
    //     return this.http.get(url).map((res: Response) => res.json())
    //         .catch((error: any) => Observable.throw('Server error'));
    // }
}
