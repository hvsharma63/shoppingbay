import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class DealsService {

    constructor(private http: HttpClient) { }

    public getAllDeals(): Observable<any> {
        return this.http.get('/api/deals');
    }

    public getDealById(id: number): Observable<any> {
        return this.http.get('/api/deals/' + id);
    }

    public createDeal(deal): Observable<any> {
        return this.http.post('/api/deals/create', deal);
    }

    public updateDeal(id: string, deal: any): Observable<any> {
        return this.http.put('/api/deals/' + id + '/update', deal);
    }

    public deleteDeal(id: string | number): Observable<any> {
        return this.http.delete('/api/deals/' + id + '/delete');
    }

    public getAllDealsRating(): Observable<any> {
        return this.http.get('/api/deals/ratings');
    }

    public deleteDealsRating(id: number): Observable<any> {
        return this.http.delete('/api/deals/' + id + '/rating/delete');
    }

    public getAllProductNamesForDeals(): Observable<any> {
        return this.http.get('/api/products/allProductNames');
    }
}
