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
        return this.http.get('http://localhost:3500/categories');
    }

    public getCategoryById(id: number): Observable<any> {
        return this.http.get('http://localhost:3500/categories/' + id);
    }

    public createCategory(categoryImage: FormData,category): Observable<any> {
        console.log(categoryImage);        
        console.log(category);        
        return this.http.post('http://localhost:3500/categories/create', categoryImage,category);
    }

    public updateCategory(id: string, category: any): Observable<any> {
        return this.http.put('http://localhost:3500/categories/' + id + '/update', category);
    }

    public deleteCategory(id: string | number): Observable<any> {
        return this.http.delete('http://localhost:3500/categories/' + id + '/delete');
    }

    public getCategoriesByName(): Observable<any> {
        return this.http.get('http://localhost:3500/categories/names');
    }
}
