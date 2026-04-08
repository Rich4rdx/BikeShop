import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginRequest, LoginResponse, RegistroRequest } from '../models/auth.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly API = `${environment.apiUrl}/api/auth`;
  private readonly TOKEN_KEY  = 'bikeshop_token';
  private readonly USER_KEY   = 'bikeshop_user';
  private readonly NOMBRE_KEY = 'bikeshop_nombre';
  private readonly ROL_KEY    = 'bikeshop_rol';

  private loggedIn$ = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient, private router: Router) {}

  login(dto: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.API}/login`, dto).pipe(
      tap(res => {
        localStorage.setItem(this.TOKEN_KEY, res.token);
        if (res.username) localStorage.setItem(this.USER_KEY, res.username);
        if (res.nombre)   localStorage.setItem(this.NOMBRE_KEY, res.nombre);
        if (res.rol)      localStorage.setItem(this.ROL_KEY, res.rol);
        this.loggedIn$.next(true);
      })
    );
  }

  registro(dto: RegistroRequest): Observable<string> {
    return this.http.post(`${this.API}/registro`, dto, { responseType: 'text' });
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    localStorage.removeItem(this.NOMBRE_KEY);
    localStorage.removeItem(this.ROL_KEY);
    this.loggedIn$.next(false);
    this.router.navigate(['/auth/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getUsername(): string {
    return localStorage.getItem(this.USER_KEY) || 'Usuario';
  }

  getNombre(): string {
    return localStorage.getItem(this.NOMBRE_KEY) || this.getUsername();
  }

  getRol(): string {
    return localStorage.getItem(this.ROL_KEY) || '';
  }

  isAdmin(): boolean {
    return this.getRol() === 'ADMIN';
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn$.asObservable();
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }
}
