import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClienteRequest, ClienteResponse } from '../models/cliente.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ClienteService {
  private readonly API = `${environment.apiUrl}/api/clientes`;

  constructor(private http: HttpClient) {}

  registrar(dto: ClienteRequest): Observable<ClienteResponse> {
    return this.http.post<ClienteResponse>(this.API, dto);
  }

  listar(): Observable<ClienteResponse[]> {
    return this.http.get<ClienteResponse[]>(this.API);
  }

  buscarPorDocumento(documento: string): Observable<ClienteResponse> {
    return this.http.get<ClienteResponse>(`${this.API}/${documento}`);
  }
}
