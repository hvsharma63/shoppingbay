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

    public createProduct(product): Observable<any> {
        return this.http.post('http://localhost:3500/products/create', product);
    }

    public updateProduct(id: string, product: any): Observable<any> {
        return this.http.put('http://localhost:3500/categories/' + id + '/update', product);
    }

    public deleteCategory(id: string | number): Observable<any> {
        return this.http.delete('http://localhost:3500/categories/' + id + '/delete');
    }

    public getCategoriesByName(): Observable<any> {
        return this.http.get('http://localhost:3500/categories/names');
    }
}
