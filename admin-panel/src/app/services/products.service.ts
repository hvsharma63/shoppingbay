import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ProductsService {

    constructor(private http: HttpClient) { }

    public getAllProducts(): Observable<any> {
        return this.http.get('http://localhost:3500/products');
    }

    public getProductById(id: number): Observable<any> {
        return this.http.get('http://localhost:3500/products/' + id);
    }

    public createProduct(product: FormData): Observable<any> {
        // tslint:disable-next-line: forin
        for (const key in product) {
            console.log(key, product[key]);
        }
        return this.http.post('http://localhost:3500/products/create', product);
    }

    public updateProduct(id: string, product: any): Observable<any> {
        console.log(id, product);

        return this.http.put('http://localhost:3500/products/' + id + '/update', product);
    }

    public deleteProduct(id: string | number): Observable<any> {
        return this.http.delete('http://localhost:3500/products/' + id + '/delete');
    }

    public getAllProductsRating(): Observable<any> {
        return this.http.get('http://localhost:3500/products/ratings');
    }

    public deleteProductsRating(id: number): Observable<any> {
        return this.http.delete('http://localhost:3500/products/' + id + '/rating/delete');
    }

}
