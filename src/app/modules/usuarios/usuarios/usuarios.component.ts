import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  mostrandoFormulario = false;
  guardando = false;

  form: FormGroup;

  constructor(
    private usuarioService: UsuarioService,
    private fb: FormBuilder,
    private snack: MatSnackBar
  ) {
    this.form = this.fb.group({
      nombre:   ['', [Validators.required, Validators.maxLength(100)]],
      username: ['', [Validators.required, Validators.maxLength(100)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rol:      ['TRABAJADOR', Validators.required]
    });
  }

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
    this.mostrandoFormulario = false;
    this.cargandoVentas = true;
    this.usuarioService.ventasPorUsuario(usuario.id).subscribe({
      next: (ventas) => { this.ventasUsuario = ventas; this.cargandoVentas = false; },
      error: () => { this.ventasUsuario = []; this.cargandoVentas = false; }
    });
  }

  abrirFormulario(): void {
    this.mostrandoFormulario = true;
    this.usuarioSeleccionado = null;
    this.form.reset({ rol: 'TRABAJADOR' });
  }

  cancelar(): void {
    this.mostrandoFormulario = false;
    this.form.reset({ rol: 'TRABAJADOR' });
  }

  guardar(): void {
    if (this.form.invalid) return;
    this.guardando = true;
    this.usuarioService.crear(this.form.value).subscribe({
      next: () => {
        this.guardando = false;
        this.mostrandoFormulario = false;
        this.form.reset({ rol: 'TRABAJADOR' });
        this.cargarUsuarios();
        this.snack.open('Usuario creado exitosamente', 'Cerrar', { duration: 3000 });
      },
      error: (err) => {
        this.guardando = false;
        const body = err.error;
        const msg = (typeof body === 'object' ? body?.error : body) || 'Error al crear usuario';
        this.snack.open(msg, 'Cerrar', { duration: 3000 });
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
