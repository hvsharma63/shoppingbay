import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class DealsService {

    constructor(private http: HttpClient) { }

    public getAllDeals(): Observable<any> {
        return this.http.get('http://localhost:3500/deals');
    }

    public getDealById(id: number): Observable<any> {
        return this.http.get('http://localhost:3500/deals/' + id);
    }

    public createDeal(deal): Observable<any> {
        return this.http.post('http://localhost:3500/deals/create', deal);
    }

    public updateDeal(id: string, deal: any): Observable<any> {
        return this.http.put('http://localhost:3500/deals/' + id + '/update', deal);
    }

    public deleteDeal(id: string | number): Observable<any> {
        return this.http.delete('http://localhost:3500/deals/' + id + '/delete');
    }

    public getAllDealsRating(): Observable<any> {
        return this.http.get('http://localhost:3500/deals/ratings');
    }

    public deleteDealsRating(id: number): Observable<any> {
        return this.http.delete('http://localhost:3500/deals/' + id + '/rating/delete');
    }

    public getAllProductNamesForDeals(): Observable<any> {
        return this.http.get('http://localhost:3500/products/allProductNames');
    }
}
