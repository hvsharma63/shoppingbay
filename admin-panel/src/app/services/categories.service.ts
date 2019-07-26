import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root',
})
export class CategoriesService {

    constructor(private http: HttpClient) { }

    public getAllCategories(): Observable<object> {
        return this.http.get('/api/categories');
    }

    public getCategoryById(id: number): Observable<any> {
        return this.http.get('/api/categories/' + id);
    }

    public createCategory(category: FormData): Observable<any> {
        console.log(category.getAll('name'));
        console.log(category.getAll('description'));
        console.log(category.getAll('imagePath'));
        console.log(category.getAll('categoryImage'));
        return this.http.post('/api/categories/create', category);
    }

    public updateCategory(id: string, category: any): Observable<any> {
        return this.http.put('/api/categories/' + id + '/update', category);
    }

    public deleteCategory(id: string | number): Observable<any> {
        return this.http.delete('/api/categories/' + id + '/delete');
    }

    public getCategoriesByName(): Observable<any> {
        return this.http.get('/api/categories/names');
    }
}
