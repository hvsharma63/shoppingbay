import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

export interface UserDetails {
    id: number;
    exp: number;
    iat: number;
}

interface TokenResponse {
    token: string;
}

export interface TokenPayload {
    id: number;
}

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private token: string;
    payload: string;
    constructor(private http: HttpClient, private router: Router) { }

    private saveToken(token: string): void {
        localStorage.setItem('userToken', token);
        this.token = token;
    }

    public getToken(): string {
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
            payload = window.atob(payload); // Decodes the poayload
            // console.log(payload);
            return JSON.parse(payload);
        } else {
            return null;
        }
    }

    public isLoggedIn(): boolean {
        const user = this.getUserDetails();
        if (user) {
            return user.exp > Date.now() / 1000;
        } else {
            return false;
        }
    }

    public register(user): Observable<any> {
        return this.http.post('/api/users/register', user);
    }

    public login(user: TokenPayload): Observable<any> {
        const base = this.http.post('/api/users/user/login', user);
        const request = base.pipe(
            map((data: TokenResponse) => {
                if (data.token) {
                    this.saveToken(data.token);
                }
            }),
        );
        return request;
    }

    public sendTokenToEmail(email: string): Observable<any> {
        console.log(email);
        return this.http.post(`/api/users/user/sendTokenToEmail`, email);
    }

    public checkTokenValidity(id: number, passwordToken: string): Observable<any> {
        return this.http.post(`/api/users/user/checkIfTokenExists`, { id, passwordToken });
    }

    public profile(): Observable<any> {
        return this.http.get(`/api/users/user/profile`);
    }

    public resetPassword(userId: number, email: string, password: string): Observable<any> {
        return this.http.post(`/api/users/user/resetPassword`, { userId, password, email });
    }
    public logout(): void {
        this.token = ``;
        window.localStorage.removeItem('userToken');
        this.router.navigate(['user/login']);
    }
}
