import { Component, OnInit } from '@angular/core';
import { UsuarioResponse } from '../../../core/models/usuario.model';
import { VentaResponse } from '../../../core/models/venta.model';
import { UsuarioService } from '../../../core/services/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  usuarios: UsuarioResponse[] = [];
  usuarioSeleccionado: UsuarioResponse | null = null;
  ventasUsuario: VentaResponse[] = [];
  cargando = false;
  cargandoVentas = false;

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.cargando = true;
    this.usuarioService.listar().subscribe({
      next: (data) => { this.usuarios = data; this.cargando = false; },
      error: () => { this.cargando = false; }
    });
  }

  seleccionarUsuario(usuario: UsuarioResponse): void {
    this.usuarioSeleccionado = usuario;
    this.cargandoVentas = true;
    this.usuarioService.ventasPorUsuario(usuario.id).subscribe({
      next: (ventas) => { this.ventasUsuario = ventas; this.cargandoVentas = false; },
      error: () => { this.ventasUsuario = []; this.cargandoVentas = false; }
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
