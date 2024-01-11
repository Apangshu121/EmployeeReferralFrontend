import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,  // Replace with the actual service
    private cookieService: CookieService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this.authService.isTokenPresent()) {
      // Token is present, allow access to the route
      return true;
    } else {
      // Token is not present, redirect to the login page
      this.router.navigate(['/']);
      return false;
    }
  }
}
