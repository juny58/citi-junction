import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LocalstorageService, LocalStorageValues } from 'src/app/services/localstorage/localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router, private localStorageService: LocalstorageService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let userId = localStorage.getItem(LocalStorageValues.userId)
    if (userId) {
      this.authService.getUserById(userId)
      return true
    }
    this.router.navigateByUrl("/auth")
    return false
  }

}
