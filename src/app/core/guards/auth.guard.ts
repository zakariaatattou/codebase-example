import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { UserService } from '../services/user.service';
import { webRoutes } from '../constants/routes';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router,
    private userService: UserService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // check authorization
    if (!this.userService.isAuthenticated()) {
      this.router.navigate(["/" + webRoutes.auth + "/" + webRoutes.login]);
      return false;
    }
    return true;
  }
}
