import { Component, Input, Output, EventEmitter } from '@angular/core';
import { VentaResponse } from '../../core/models/venta.model';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.scss']
})
export class FacturaComponent {
  @Input() venta!: VentaResponse;
  @Output() cerrar = new EventEmitter<void>();

  imprimir(): void {
    window.print();
  }

  formatPrice(price: number): string {
    return '$' + price.toLocaleString('es-CO');
  }

  formatFecha(fecha: string): string {
    return new Date(fecha).toLocaleDateString('es-CO', {
      day: '2-digit', month: 'long', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  }
}
