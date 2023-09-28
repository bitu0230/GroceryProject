// import { CanActivateFn } from '@angular/router';

// export const authGuard: CanActivateFn = (route, state) => {
//   return true;
// };


import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AccountService, private router: Router) {}

  canActivate(): boolean {
    if (sessionStorage.getItem("token")) {
      return true; // Allow access to the route
    } else {
      this.router.navigate(['/login']); // Redirect to the login page if not authenticated
      return false; // Block access to the route
    }
  }
}
