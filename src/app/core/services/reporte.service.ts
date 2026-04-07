import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReporteVentas } from '../models/reporte.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ReporteService {
  private readonly API = `${environment.apiUrl}/api/reportes`;

  constructor(private http: HttpClient) {}

  getReporte(fechaInicio: string, fechaFin: string): Observable<ReporteVentas> {
    return this.http.get<ReporteVentas>(`${this.API}/ventas`, {
      params: { fechaInicio, fechaFin }
    });
  }

  descargarExcel(fechaInicio: string, fechaFin: string): Observable<Blob> {
    return this.http.get(`${this.API}/ventas/excel`, {
      params: { fechaInicio, fechaFin },
      responseType: 'blob'
    });
  }

  descargarPdf(fechaInicio: string, fechaFin: string): Observable<Blob> {
    return this.http.get(`${this.API}/ventas/pdf`, {
      params: { fechaInicio, fechaFin },
      responseType: 'blob'
    });
  }
}
