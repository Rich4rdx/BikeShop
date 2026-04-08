export interface UsuarioResponse {
  id: number;
  username: string;
  nombre: string;
  rol: 'ADMIN' | 'TRABAJADOR';
  totalVentas: number;
}
