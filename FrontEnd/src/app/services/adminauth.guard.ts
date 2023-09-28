import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard1 implements CanActivate {
  constructor(private authService: AccountService, private router: Router) {}

  canActivate(): boolean {
    if (sessionStorage.getItem("role")?.toString() == "admin") {
      return true; // Allow access to the route
    } else {
      this.router.navigate(['/home']); // Redirect to the login page if not authenticated
      return false; // Block access to the route
    }
  }
}
