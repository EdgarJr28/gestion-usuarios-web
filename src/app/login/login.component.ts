import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

})
export class LoginComponent {
  loginData = {
    email: '',
    password: ''
  };
  errorMessage: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  onSubmit() {
    this.authService.login(this.loginData.email, this.loginData.password).subscribe(
      response => {
        console.log('Login successful', response);
        // Maneja la respuesta del login aquí
        if (response.access_token) {
          localStorage.setItem('authToken', response.access_token); // Guarda el token
          this.router.navigate(['/dashboard']); // Redirige después del login exitoso
        }
      },
      error => {
        this.errorMessage = error?.message || 'An unknown error occurred';
      }
    );
  }

  clearError() {
    this.errorMessage = null;
  }
}
