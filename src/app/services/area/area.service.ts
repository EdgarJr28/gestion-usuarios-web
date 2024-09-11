import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AreaService {
  private apiUrl = `${environment.apiUrl}/areas`; // Ajusta esta URL a la de tu API

  constructor(private http: HttpClient) { }

  // Obtener todas las áreas
  getAreas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  // Crear una nueva área
  createArea(area: any): Observable<any> {
    console.log(area);
    return this.http.post<any>(this.apiUrl, area).pipe(
      catchError(this.handleError)
    );
  }

  // Actualizar un área existente
  updateArea(area: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${area.id}`, area).pipe(
      catchError(this.handleError)
    );
  }

  // Eliminar un área por su ID
  deleteArea(areaId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${areaId}`).pipe(
      catchError(this.handleError)
    );
  }

  // Contar las áreas activas
  countActiveAreas(): Observable<{ count: number }> {
    return this.http.get<{ count: number }>(`${this.apiUrl}/count-active`);
  }

  // Manejo de errores
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente o de red
      errorMessage = `An error occurred: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      errorMessage = error.error?.message || `Server returned code ${error.status}`;
    }
    // Registrar el error en consola (puedes enviar a un servicio de logging externo)
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
