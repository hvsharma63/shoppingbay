import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Categories {
    id: number;
    name: string;
    imagePath: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}

@Injectable({
    providedIn: 'root',
})
export class CategoriesService {

    constructor(private http: HttpClient) { }

    public getAllCategories(): Observable<object> {
        return this.http.get('http://localhost:3000/categories');
    }

    public getCategoryById(id: number): Observable<any> {
        return this.http.get('http://localhost:3000/categories/' + id);
    }

    public createCategory(category): Observable<any> {
        return this.http.post('http://localhost:3000/categories/create', category);
    }

    public updateCategory(id, category): Observable<any> {
        return this.http.put('http://localhost:3000/categories/' + id + '/update', category);
    }

    public deleteCategory(id): Observable<any> {
        return this.http.delete('http://localhost:3000/categories/' + id + '/delete');
    }
}
