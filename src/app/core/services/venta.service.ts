import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VentaRequest, VentaResponse } from '../models/venta.model';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class VentaService {
  private readonly API = `${environment.apiUrl}/api/ventas`;

  constructor(private http: HttpClient) {}

  registrar(dto: VentaRequest): Observable<VentaResponse> {
    return this.http.post<VentaResponse>(this.API, dto);
  }

  listar(): Observable<VentaResponse[]> {
    return this.http.get<VentaResponse[]>(this.API);
  }

  obtenerPorId(id: number): Observable<VentaResponse> {
    return this.http.get<VentaResponse>(`${this.API}/${id}`);
  }
}
