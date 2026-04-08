import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReporteVentas } from '../../../core/models/reporte.model';
import { ReporteService } from '../../../core/services/reporte.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss']
})
export class ReportesComponent implements OnInit {
  reporte: ReporteVentas | null = null;
  cargando = false;
  descargando: 'pdf' | 'excel' | null = null;

  // Rango de fechas — por defecto el mes actual
  fechaInicio: string = this.primerDiaMes();
  fechaFin: string    = this.hoy();
  readonly fechaMax: string = this.hoy();

  constructor(
    private reporteService: ReporteService,
    private snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.generarReporte();
  }

  generarReporte(): void {
    if (this.fechaInicio > this.fechaFin) {
      this.snack.open('La fecha de inicio no puede ser mayor a la fecha fin', 'Cerrar', { duration: 3000 });
      return;
    }
    this.cargando = true;
    this.reporte = null;
    this.reporteService.getReporte(this.fechaInicio, this.fechaFin).subscribe({
      next: (data) => { this.reporte = data; this.cargando = false; },
      error: ()     => { this.cargando = false;
        this.snack.open('Error al cargar el reporte', 'Cerrar', { duration: 3000 }); }
    });
  }

  descargarPdf(): void {
    this.descargando = 'pdf';
    this.reporteService.descargarPdf(this.fechaInicio, this.fechaFin).subscribe({
      next: (blob) => {
        this.triggerDescarga(blob, `reporte-${this.fechaInicio}-${this.fechaFin}.pdf`);
        this.descargando = null;
      },
      error: () => {
        this.descargando = null;
        this.snack.open('Error al generar el PDF', 'Cerrar', { duration: 3000 });
      }
    });
  }

  descargarExcel(): void {
    this.descargando = 'excel';
    this.reporteService.descargarExcel(this.fechaInicio, this.fechaFin).subscribe({
      next: (blob) => {
        this.triggerDescarga(blob, `reporte-${this.fechaInicio}-${this.fechaFin}.xlsx`);
        this.descargando = null;
      },
      error: () => {
        this.descargando = null;
        this.snack.open('Error al generar el Excel', 'Cerrar', { duration: 3000 });
      }
    });
  }

  private triggerDescarga(blob: Blob, nombre: string): void {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = nombre;
    a.click();
    URL.revokeObjectURL(url);
  }

  formatPrice(value: number): string {
    return '$' + value.toLocaleString('es-CO', { minimumFractionDigits: 0 });
  }

  formatFecha(fecha: string): string {
    if (!fecha) return '—';
    return new Date(fecha).toLocaleDateString('es-CO', {
      day: 'numeric', month: 'short', year: 'numeric'
    });
  }

  private hoy(): string {
    return new Date().toISOString().substring(0, 10);
  }

  private primerDiaMes(): string {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1).toISOString().substring(0, 10);
  }
}
