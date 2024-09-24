import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate, RouterStateSnapshot,
  UrlTree,
  Router,
  CanLoad,
  Route,
  UrlSegment,
} from '@angular/router';
import { Observable, tap } from 'rxjs';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor( private authService: AuthService,
               private router: Router
    ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {

      return this.authService.revalidateToken()
        .pipe(
          tap( valid => {
            if ( !valid ) {
              this.router.navigateByUrl('/pages/login');
            }
          } )
        )
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

      return this.authService.revalidateToken()
          .pipe(
            tap( valid => {
              if ( !valid ) {
                this.router.navigateByUrl('/pages/login');
              }
            } )
          )
  }
  
}
