export interface DetalleVentaRequest {
  bicicletaId: number;
  cantidad: number;
}

export interface VentaRequest {
  documentoCliente: string;
  detalles: DetalleVentaRequest[];
}

export interface DetalleVentaResponse {
  codigoBicicleta: number;
  modeloBicicleta: string;
  marcaBicicleta: string;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
}

export interface VentaResponse {
  idVenta: number;
  fecha: string;
  cliente: string;
  documentoCliente: string;
  total: number;
  usuarioNombre?: string;
  detalles: DetalleVentaResponse[];
}

// Cart item for POS
export interface CartItem {
  bicicleta: {
    codigo: number;
    modelo: string;
    marca: string;
    precio: number;
    cantidadInventario: number;
    tipo: string;
    imagenBase64?: string;
  };
  cantidad: number;
  subtotal: number;
}
