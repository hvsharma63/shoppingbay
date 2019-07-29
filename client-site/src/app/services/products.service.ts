import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


@Injectable({
    providedIn: 'root'
})
export class ProductService {
    constructor(private http: HttpClient) { }

    searchEntries(term): Observable<any> {
        return this.http.get('/api/products/search?products=' + term);
    }

    getAllProducts(): Observable<any> {
        return this.http.get('/api/products');
    }

    getProductById(id: number): Observable<any> {
        return this.http.get('/api/products/' + id + '?all=true');
    }
}
