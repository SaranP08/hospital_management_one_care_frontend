import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service'; // Assuming AuthService handles authentication

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    let isAuthenticated: boolean = false;
    this.authService.isLoggedIn().subscribe((data) => {
      isAuthenticated = data;
    })
    if (isAuthenticated) {

      return true; // Allow navigation
    } else {
      // Redirect to login page with the return URL
      this.router.navigate(['/login']);
      return false; // Prevent navigation
    }
  }
}
