import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class OrdersService {

    constructor(private http: HttpClient) { }

    public getAllOrders(): Observable<any> {
        return this.http.get('/api/orders');
    }
    public getSingleOrderDetails(id: number): Observable<any> {
        return this.http.get('/api/orders/' + id + '/products');
    }


}
