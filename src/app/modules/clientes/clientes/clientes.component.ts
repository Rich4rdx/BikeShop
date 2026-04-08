import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ClienteResponse } from '../../../core/models/cliente.model';
import { VentaResponse } from '../../../core/models/venta.model';

import { ClienteService } from '../../../core/services/cliente.service';
import { VentaService } from '../../../core/services/venta.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {
  clientes: ClienteResponse[] = [];
  clientesFiltrados: ClienteResponse[] = [];
  clienteSeleccionado: ClienteResponse | null = null;
  ventasCliente: VentaResponse[] = [];
  facturaActual: VentaResponse | null = null;
  busqueda = '';
  mostrandoFormulario = false;
  cargando = false;

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private ventaService: VentaService,
    private snack: MatSnackBar
  ) {
    this.form = this.fb.group({
      documento: ['', [Validators.required, Validators.maxLength(20)]],
      nombre: ['', [Validators.required, Validators.maxLength(100)]],
      telefono: ['', [Validators.required, Validators.maxLength(20)]]
    });
  }

  ngOnInit(): void {
    this.cargarClientes();
  }

  cargarClientes(): void {
    this.cargando = true;
    this.clienteService.listar().subscribe({
      next: (data) => {
        this.clientes = data;
        this.filtrar();
        this.cargando = false;
      },
      error: () => { this.cargando = false; }
    });
  }

  filtrar(): void {
    const q = this.busqueda.toLowerCase();
    this.clientesFiltrados = this.clientes.filter(c =>
      c.nombre.toLowerCase().includes(q) ||
      c.documento.includes(q)
    );
  }

  seleccionarCliente(cliente: ClienteResponse): void {
    this.clienteSeleccionado = cliente;
    this.cargarVentasCliente(cliente.documento);
  }

  cargarVentasCliente(documento: string): void {
    this.ventaService.listarPorCliente(documento).subscribe({
      next: (ventas) => {
        this.ventasCliente = ventas;
      },
      error: () => {
        this.ventasCliente = [];
      }
    });
  }

  registrar(): void {
    if (this.form.invalid) return;
    this.clienteService.registrar(this.form.value).subscribe({
      next: () => {
        this.snack.open('✅ Cliente registrado', 'Cerrar', {
          duration: 3000, panelClass: ['success-snack']
        });
        this.form.reset();
        this.mostrandoFormulario = false;
        this.cargarClientes();
      },
      error: (err) => {
        const msg = err.error?.message || 'Error al registrar cliente';
        this.snack.open(msg, 'Cerrar', { duration: 3000, panelClass: ['error-snack'] });
      }
    });
  }

  formatFecha(fecha: string): string {
    return new Date(fecha).toLocaleDateString('es-CO', {
      day: '2-digit', month: 'short', year: 'numeric'
    });
  }

  formatPrice(price: number): string {
    return '$' + price.toLocaleString('es-CO');
  }
}
