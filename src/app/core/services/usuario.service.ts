import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioResponse } from '../models/usuario.model';
import { VentaResponse } from '../models/venta.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private readonly API = `${environment.apiUrl}/api/usuarios`;

  constructor(private http: HttpClient) {}

  listar(): Observable<UsuarioResponse[]> {
    return this.http.get<UsuarioResponse[]>(this.API);
  }

  ventasPorUsuario(id: number): Observable<VentaResponse[]> {
    return this.http.get<VentaResponse[]>(`${this.API}/${id}/ventas`);
  }
}
