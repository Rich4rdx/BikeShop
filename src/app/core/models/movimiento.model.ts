export interface MovimientoResponse {
  id: number;
  tipo: 'ENTRADA' | 'SALIDA';
  codigoBicicleta: number;
  marcaBicicleta: string;
  modeloBicicleta: string;
  cantidad: number;
  fecha: string;
}

export interface MovimientoRequest {
  tipo: 'ENTRADA' | 'SALIDA';
  bicicletaId: number | null;
  cantidad: number;
  motivo: string;
}
