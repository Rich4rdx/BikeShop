export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegistroRequest {
  username: string;
  password: string;
  nombre: string;
  rol?: string;
}

export interface LoginResponse {
  token: string;
  username?: string;
  nombre?: string;
  rol?: string;
}
