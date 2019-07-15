import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
    constructor(private auth: AuthenticationService, private router: Router) { }

    canActivate() {
        if (!this.auth.isLoggedIn()) {
            this.router.navigate(['/']);
            return false;
        }
        return true;
    }

    canActivateChild() {
        if (!this.auth.isLoggedIn()) {
            this.router.navigate(['/']);
            return false;
        }
        return true;
    }
}
