import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private authService = inject( AuthService );
  private router      = inject( Router );

  canActivate(): Observable<boolean> {
    return this.authService.isAuth()
      .pipe(
        tap( state => {
          if( !state ) this.router.navigateByUrl('/login');
        } )
      )
  }
}
