import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BicicletaResponse } from '../../../core/models/bicicleta.model';
import { ClienteResponse } from '../../../core/models/cliente.model';
import { CartItem, VentaResponse } from '../../../core/models/venta.model';
import { BicicletaService } from '../../../core/services/bicicleta.service';
import { ClienteService } from '../../../core/services/cliente.service';
import { VentaService } from '../../../core/services/venta.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.scss']
})
export class VentasComponent implements OnInit {
  bicicletas: BicicletaResponse[] = [];
  bicicletasFiltradas: BicicletaResponse[] = [];
  busquedaBike = '';

  cliente: ClienteResponse | null = null;
  busquedaDoc = '';
  buscandoCliente = false;

  carrito: CartItem[] = [];
  procesando = false;
  facturaActual: VentaResponse | null = null;

  constructor(
    private bicicletaService: BicicletaService,
    private clienteService: ClienteService,
    private ventaService: VentaService,
    private snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.cargarBicicletas();
  }

  cargarBicicletas(): void {
    this.bicicletaService.listar().subscribe({
      next: (data) => {
        this.bicicletas = data.filter(b => b.cantidadInventario > 0);
        this.bicicletasFiltradas = [...this.bicicletas];
      },
      error: () => this.snack.open('Error cargando bicicletas', 'Cerrar', { duration: 3000 })
    });
  }

  filtrarBicicletas(): void {
    const q = this.busquedaBike.toLowerCase();
    this.bicicletasFiltradas = this.bicicletas.filter(b =>
      b.modelo.toLowerCase().includes(q) ||
      b.marca.toLowerCase().includes(q) ||
      b.codigo.toString().includes(q)
    );
  }

  buscarCliente(): void {
    if (!this.busquedaDoc.trim()) return;
    this.buscandoCliente = true;
    this.clienteService.buscarPorDocumento(this.busquedaDoc.trim()).subscribe({
      next: (c) => {
        this.cliente = c;
        this.buscandoCliente = false;
      },
      error: () => {
        this.buscandoCliente = false;
        this.snack.open('Cliente no encontrado', 'Cerrar', {
          duration: 3000, panelClass: ['error-snack']
        });
      }
    });
  }

  limpiarCliente(): void {
    this.cliente = null;
    this.busquedaDoc = '';
  }

  agregarAlCarrito(bici: BicicletaResponse): void {
    const existente = this.carrito.find(i => i.bicicleta.codigo === bici.codigo);
    if (existente) {
      if (existente.cantidad >= bici.cantidadInventario) {
        this.snack.open('Stock insuficiente', 'Cerrar', { duration: 2000 });
        return;
      }
      existente.cantidad++;
      existente.subtotal = existente.cantidad * existente.bicicleta.precio;
    } else {
      this.carrito.push({
        bicicleta: {
          codigo: bici.codigo,
          modelo: bici.modelo,
          marca: bici.marca,
          precio: bici.precio,
          cantidadInventario: bici.cantidadInventario,
          tipo: bici.tipo,
          imagenBase64: bici.imagenBase64
        },
        cantidad: 1,
        subtotal: bici.precio
      });
    }
  }

  cambiarCantidad(item: CartItem, delta: number): void {
    const nueva = item.cantidad + delta;
    if (nueva <= 0) {
      this.quitarDelCarrito(item);
      return;
    }
    if (nueva > item.bicicleta.cantidadInventario) {
      this.snack.open('Stock insuficiente', 'Cerrar', { duration: 2000 });
      return;
    }
    item.cantidad = nueva;
    item.subtotal = nueva * item.bicicleta.precio;
  }

  quitarDelCarrito(item: CartItem): void {
    this.carrito = this.carrito.filter(i => i !== item);
  }

  get total(): number {
    return this.carrito.reduce((acc, i) => acc + i.subtotal, 0);
  }

  get puedeComprar(): boolean {
    return !!this.cliente && this.carrito.length > 0 && !this.procesando;
  }

  completarVenta(): void {
    if (!this.puedeComprar) return;
    this.procesando = true;

    const dto = {
      documentoCliente: this.cliente!.documento,
      detalles: this.carrito.map(i => ({
        bicicletaId: i.bicicleta.codigo,
        cantidad: i.cantidad
      }))
    };

   
    this.ventaService.registrar(dto).subscribe({
      next: (venta) => {
        this.procesando = false;
        this.facturaActual = venta;
        this.carrito = [];
        this.cliente = null;
        this.busquedaDoc = '';
        this.cargarBicicletas();
      },
      error: (err) => {
        this.procesando = false;
        const msg = err.error?.message || 'Error al registrar la venta';
        this.snack.open(msg, 'Cerrar', {
          duration: 4000, panelClass: ['error-snack']
        });
      }
    });
  }

  getBadgeClass(tipo: string): string {
    const map: Record<string, string> = {
      'MONTAÑA': 'badge-montana',
      'RUTA': 'badge-ruta',
      'URBANA': 'badge-urbana'
    };
    return map[tipo] || '';
  }

  formatPrice(price: number): string {
    return '$' + price.toLocaleString('es-CO');
  }
}
