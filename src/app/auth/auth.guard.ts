import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true;  // Si el usuario está autenticado, permite el acceso
    } else {
      this.router.navigate(['/login']);  // Si no está autenticado, redirige al login
      return false;
    }
  }
}
