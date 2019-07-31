import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class ProductService {
    constructor(private http: HttpClient) { }

    selectedFilter = new BehaviorSubject<any>('new');
    searchEntries(term): Observable<any> {
        return this.http.get('/api/products/search?products=' + term);
    }

    getAllProductsForShopping(filteredOption: string): Observable<any> {
        console.log(filteredOption);
        return this.http.get('/api/products?' + filteredOption + '=true');
    }

    getAllProducts(): Observable<any> {
        return this.http.get('/api/products?limit=6');
    }

    getAllDiscountedProducts(): Observable<any> {
        return this.http.get('/api/products?limit=8');
    }

    getProductById(id: number): Observable<any> {
        return this.http.get('/api/products/' + id + '?all=true');
    }

    getRecentlyViewedProducts(): Observable<any> {
        return this.http.get('/api/products/recent');
    }

    shareFilteredOption(selected) {
        console.log(selected);
        this.selectedFilter.next(selected);
    }
}
