import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

export interface UserDetails {
    role: any;
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    exp: number;
    iat: number;
}

interface TokenResponse {
    token: string;
}

export interface TokenPayload {
    id: number;
    firstName: string;
    lastName: string;
    dob: string;
    contact: string;
    email: string;
    password: string;
    role: string;
}

@Injectable()
export class AuthenticationService {
    private token: string;
    constructor(private http: HttpClient, private router: Router) { }

    private saveToken(token: string): void {
        localStorage.setItem('userToken', token);
        this.token = token;
    }

    private getToken(): string {
        if (!this.token) {
            this.token = localStorage.getItem('userToken');
        }
        return this.token;
    }

    public getUserDetails(): UserDetails {
        const token = this.getToken();
        let payload;
        if (token) {
            payload = token.split('.')[1];
            // console.log(payload);
            payload = window.atob(payload);
            // console.log(payload);
            return JSON.parse(payload);
        } else {
            return null;
        }
    }

    public isLoggedIn(): boolean {
        const user = this.getUserDetails();
        if (user) {
            // console.log(user.exp, Date.now() / 1000);
            // console.log(user.exp > Date.now() / 1000);
            return user.exp > Date.now() / 1000;
        } else {
            return false;
        }
    }

    public register(user: TokenPayload): Observable<any> {
        console.log(user);
        const base = this.http.post('http://localhost:3000/users/register', user);
        const request = base.pipe(
            map((data: TokenResponse) => {
                if (data.token) {
                    this.saveToken(data.token);
                }
                return data;
            })
        );
        return request;
    }

    public login(user: TokenPayload): Observable<any> {
        const base = this.http.post('http://localhost:3000/users/login', user);
        console.log(base);
        // console.log(user);
        const request = base.pipe(
            map((data: TokenResponse) => {
                if (data.token) {
                    this.saveToken(data.token);
                }
            }),
        );
        return request;
    }

    public profile(): Observable<any> {
        return this.http.get(`http://localhost:3000/users/profile`, {
            headers: { Authorization: `${this.getToken()}` }
        });
    }

    public logout(): void {
        this.token = ``;
        window.localStorage.removeItem('userToken');
        this.router.navigate(['admin/login']);
    }
}
