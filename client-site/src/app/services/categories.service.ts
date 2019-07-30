import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    constructor(private http: HttpClient) { }

    getLatestCategories(): Observable<any> {
        return this.http.get('/api/categories?latest=true');
    }

    getAllProductsByCategoryID(Id: number): Observable<any> {
        return this.http.get('/api/categories/' + Id + '/products');
    }
}
