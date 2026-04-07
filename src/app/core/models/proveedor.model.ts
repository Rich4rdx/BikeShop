export interface ProveedorRequest {
  nit: string;
  nombre: string;
  telefono: string;
  email: string;
  direccion: string;
  ciudad: string;
}

export interface ProveedorResponse {
  nit: string;
  nombre: string;
  telefono: string;
  email: string;
  direccion: string;
  ciudad: string;
}

export interface HistorialComprasRequest {
  nitProveedor: string;
  codigoBicicleta: number;
  cantidad: number;
  precioUnitario: number;
}

export interface HistorialComprasResponse {
  id: number;
  nitProveedor: string;
  nombreProveedor: string;
  codigoBicicleta: number;
  modeloBicicleta: string;
  cantidad: number;
  precioUnitario: number;
  total: number;
  fecha: string;
}
