import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { BicicletaRequest, BicicletaResponse } from '../models/bicicleta.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class BicicletaService {
  private readonly API = `${environment.apiUrl}/api/bicicletas`;
  private readonly IMAGES_KEY = 'bikeshop_bike_images';

  constructor(private http: HttpClient) {}

  crear(dto: BicicletaRequest): Observable<BicicletaResponse> {
    return this.http.post<BicicletaResponse>(this.API, dto);
  }

  listar(): Observable<BicicletaResponse[]> {
    return this.http.get<BicicletaResponse[]>(this.API).pipe(
      map(bikes => bikes.map(b => ({
        ...b,
        imagenBase64: this.getImage(b.codigo)
      })))
    );
  }

  obtenerPorId(id: number): Observable<BicicletaResponse> {
    return this.http.get<BicicletaResponse>(`${this.API}/${id}`).pipe(
      map(b => ({ ...b, imagenBase64: this.getImage(b.codigo) }))
    );
  }

 
  saveImage(codigoBicicleta: number, base64: string): void {
    const images = this.getAllImages();
    images[codigoBicicleta] = base64;
    localStorage.setItem(this.IMAGES_KEY, JSON.stringify(images));
  }

  getImage(codigoBicicleta: number): string | undefined {
    return this.getAllImages()[codigoBicicleta];
  }

  private getAllImages(): Record<number, string> {
    const raw = localStorage.getItem(this.IMAGES_KEY);
    return raw ? JSON.parse(raw) : {};
  }
}
