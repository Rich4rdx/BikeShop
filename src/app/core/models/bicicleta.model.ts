export type TipoBicicleta = 'MONTAÑA' | 'RUTA' | 'URBANA';

export interface BicicletaRequest {
  marca: string;
  modelo: string;
  tipo: TipoBicicleta;
  precio: number;
  cantidadInventario: number;
  nitProveedor: string;
}

export interface BicicletaResponse {
  codigo: number;
  marca: string;
  modelo: string;
  tipo: TipoBicicleta;
  precio: number;
  cantidadInventario: number;
  nitProveedor: string;
  nombreProveedor: string;
  imagenBase64?: string; // stored locally
}
