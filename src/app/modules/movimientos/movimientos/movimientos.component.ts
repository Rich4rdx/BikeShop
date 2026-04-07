import { Component, OnInit } from '@angular/core';
import { MovimientoResponse } from '../../../core/models/movimiento.model';
import { MovimientoService } from '../../../core/services/movimiento.service';

@Component({
  selector: 'app-movimientos',
  templateUrl: './movimientos.component.html',
  styleUrls: ['./movimientos.component.scss']
})
export class MovimientosComponent implements OnInit {
  movimientos: MovimientoResponse[] = [];
  movimientosFiltrados: MovimientoResponse[] = [];
  filtro: string = 'Todos';
  cargando = true;

  get totalEntradas(): number {
    return this.movimientos
      .filter(m => m.tipo === 'ENTRADA')
      .reduce((acc, m) => acc + m.cantidad, 0);
  }

  get totalSalidas(): number {
    return this.movimientos
      .filter(m => m.tipo === 'SALIDA')
      .reduce((acc, m) => acc + m.cantidad, 0);
  }

  get balance(): number {
    return this.totalEntradas - this.totalSalidas;
  }

  constructor(private movimientoService: MovimientoService) {}

  ngOnInit(): void {
    this.movimientoService.listar().subscribe({
      next: (data) => {
        this.movimientos = data.sort((a, b) =>
          new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
        );
        this.aplicarFiltro();
        this.cargando = false;
      },
      error: () => { this.cargando = false; }
    });
  }

  aplicarFiltro(): void {
    if (this.filtro === 'Todos') {
      this.movimientosFiltrados = [...this.movimientos];
    } else {
      this.movimientosFiltrados = this.movimientos.filter(
        m => m.tipo === this.filtro.toUpperCase()
      );
    }
  }

  formatFecha(fecha: string): string {
    const [year, month, day] = fecha.split('-').map(Number);
    return new Date(year, month - 1, day).toLocaleDateString('es-CO', {
      day: 'numeric', month: 'short', year: 'numeric'
    });
  }
}
