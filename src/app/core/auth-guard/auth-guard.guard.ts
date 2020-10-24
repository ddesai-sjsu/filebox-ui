import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanActivate,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // your  logic goes here
    const url: string = state.url;
    const loggedIn = this.checkLogin(url);
    if (loggedIn) {
      return true;
    } else {
      this.router.navigate(['/login']);
    }
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    const url: string = state.url;
    const loggedIn = this.checkLogin(url);
    if (loggedIn) {
      return true;
    } else {
      this.router.navigate(['/login']);
    }
  }

  checkLogin(url: string): boolean {
    const token = sessionStorage.getItem('token');
    const userData = sessionStorage.getItem('userDetails');
    if (token) {
      if (url.includes('admin') && userData && JSON.parse(userData).isAdmin) {
        return true;
      } else if (url.includes('admin')) {
        return false;
      }
      return true;
    } else {
      return false;
    }

    // Redirect to the login page
  }
}
