import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  ProveedorRequest, ProveedorResponse,
  HistorialComprasRequest, HistorialComprasResponse
} from '../models/proveedor.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ProveedorService {
  private readonly API = `${environment.apiUrl}/api/proveedores`;

  constructor(private http: HttpClient) {}

  crear(dto: ProveedorRequest): Observable<ProveedorResponse> {
    return this.http.post<ProveedorResponse>(this.API, dto);
  }

  listar(): Observable<ProveedorResponse[]> {
    return this.http.get<ProveedorResponse[]>(this.API);
  }

  obtenerPorNit(nit: string): Observable<ProveedorResponse> {
    return this.http.get<ProveedorResponse>(`${this.API}/${nit}`);
  }

  actualizar(nit: string, dto: ProveedorRequest): Observable<ProveedorResponse> {
    return this.http.put<ProveedorResponse>(`${this.API}/${nit}`, dto);
  }

  eliminar(nit: string): Observable<void> {
    return this.http.delete<void>(`${this.API}/${nit}`);
  }

  registrarCompra(dto: HistorialComprasRequest): Observable<HistorialComprasResponse> {
    return this.http.post<HistorialComprasResponse>(`${this.API}/compras/registrar`, dto);
  }

  obtenerComprasPorProveedor(nit: string): Observable<HistorialComprasResponse[]> {
    return this.http.get<HistorialComprasResponse[]>(`${this.API}/${nit}/compras`);
  }

  obtenerTodoHistorial(): Observable<HistorialComprasResponse[]> {
    return this.http.get<HistorialComprasResponse[]>(`${this.API}/compras/todas`);
  }
}
