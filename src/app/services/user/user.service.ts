import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/usuarios`; // Ajusta esta URL a tu API

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  createUser(user: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, user).pipe(
      catchError(this.handleError)
    );
  }

  updateUser(user: any): Observable<any> {
    console.log(user);
    return this.http.put<any>(`${this.apiUrl}/${user.id}`, user).pipe(
      catchError(this.handleError)
    );
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${userId}`).pipe(
      catchError(this.handleError)
    );
  }

 
  countActiveUsers(): Observable<{ count: number }> {
    return this.http.get<{ count: number }>(`${this.apiUrl}/count-active`);
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `An error occurred: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = error.error?.message || `Server returned code ${error.status}`;
    }
    // Optionally log the error to an external logging service
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
