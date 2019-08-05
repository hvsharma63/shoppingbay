import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';


@Injectable({
    providedIn: 'root'
})
export class CartService {
    constructor(private toastr: ToastrService, private http: HttpClient) { }
    private cartSubject = new Subject<any>();
    Products = [];
    CartState = this.cartSubject.asObservable();

    addProduct(product: { productId: number, qty: number }) {
        const checkIfProductIsInCart = this.Products.some((ele) => {
            return (ele.productId === product.productId);
        });
        if (!checkIfProductIsInCart) { // false Condition
            this.Products.push(product);
            this.cartSubject.next({ products: this.Products });
            this.toastr.success('Product Added to cart!');
        } else {

            this.toastr.error('Product is already added to the cart');
        }
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
