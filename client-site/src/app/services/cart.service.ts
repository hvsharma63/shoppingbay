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
        console.log(product);
        const checkIfProductIsInCart = this.Products.some((ele) => {
            if (ele.productId === product.productId) {
                return (ele.qty === product.qty);
            }
            return false;
        });
        if (!checkIfProductIsInCart) { // false Condition
            for (const iterator of this.Products) {
                if (iterator.productId == product.productId) {
                    console.log("in loop");
                    iterator.qty = Number(iterator.qty) + Number(product.qty);
                    console.log(typeof (iterator.qty));
                }
            }
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
