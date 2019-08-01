import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class CartService {
    constructor(private http: HttpClient) { }
    private cartSubject = new Subject<any>();
    Products = [];
    CartState = this.cartSubject.asObservable();

    addProduct(product: any) {
        this.Products.push(product);
        this.cartSubject.next({ products: this.Products });
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
