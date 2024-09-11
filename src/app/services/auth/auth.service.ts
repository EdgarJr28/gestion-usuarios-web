import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const loginData = { email, password };
    return this.http.post<any>(`${this.apiUrl}/login`, loginData).pipe(
      catchError(this.handleError)
    );
  }

  logout() {
    // Borra el token del almacenamiento
    localStorage.removeItem('authToken'); // o sessionStorage dependiendo de dónde almacenes el token
    // Redirige al usuario a la página de inicio de sesión o principal
    window.location.href = '/login'; // ajusta la ruta según tu configuración
  }
  
  isAuthenticated(): boolean {
    const token = localStorage.getItem('authToken');
    if (!token) {
      return false;
    }

    // Verifica si el token tiene la estructura correcta
    return this.isValidToken(token);
  }

  private isValidToken(token: string): boolean {
    try {
      // Decodifica el token y verifica si está bien formado
      // Este es un ejemplo básico. Dependiendo de tu token, es posible que necesites realizar una verificación más compleja.
      const payload = JSON.parse(atob(token.split('.')[1]));
      return !!payload && !!payload.exp; // Verifica si el payload tiene una propiedad `exp` (expiración)
    } catch (e) {
      return false;
    }
  }
  

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente o red
      errorMessage = `An error occurred: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      errorMessage = error.error?.message || `Server returned code ${error.status}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}
