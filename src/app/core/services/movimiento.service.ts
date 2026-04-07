import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MovimientoRequest, MovimientoResponse } from '../models/movimiento.model';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class MovimientoService {
  private readonly API = `${environment.apiUrl}/api/movimientos`;

  constructor(private http: HttpClient) {}

  listar(): Observable<MovimientoResponse[]> {
    return this.http.get<MovimientoResponse[]>(this.API);
  }

  registrar(dto: MovimientoRequest): Observable<MovimientoResponse> {
    return this.http.post<MovimientoResponse>(this.API, dto);
  }
}
