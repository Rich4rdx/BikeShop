import { VentaResponse } from './venta.model';

export interface TopBicicleta {
  marca: string;
  modelo: string;
  cantidadVendida: number;
  ingresosTotales: number;
}

export interface VentaPorDia {
  fecha: string;
  cantidadVentas: number;
  totalDia: number;
}

export interface ReporteVentas {
  fechaInicio: string;
  fechaFin: string;
  totalVentas: number;
  totalIngresos: number;
  promedioPorVenta: number;
  clienteFrecuente: string;
  comprasClienteFrecuente: number;
  topBicicletas: TopBicicleta[];
  ventasPorDia: VentaPorDia[];
  ventasRecientes: VentaResponse[];
}
