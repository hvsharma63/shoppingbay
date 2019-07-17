import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { AuthenticationService } from './services/auth.service';
import { Observable } from 'rxjs';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(public auth: AuthenticationService) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // console.log(request.url.indexOf('/login'));
        if (request.url.indexOf('/login') === -1) {
            request = request.clone({
                setHeaders: {
                    Authorization: `${this.auth.getToken()}`
                }
            });
        }
        return next.handle(request);
    }
}
