import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProveedorResponse } from '../../../core/models/proveedor.model';
import { ProveedorService } from '../../../core/services/proveedor.service';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.scss']
})
export class ProveedoresComponent implements OnInit {
  proveedores: ProveedorResponse[] = [];
  cargando = false;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private proveedorService: ProveedorService,
    private snack: MatSnackBar
  ) {
    this.form = this.fb.group({
      nit: ['', [Validators.required, Validators.maxLength(20)]],
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      telefono: ['', [Validators.required, Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      direccion: ['', [Validators.required, Validators.minLength(5)]],
      ciudad: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.cargando = true;
    this.proveedorService.listar().subscribe({
      next: (data) => {
        this.proveedores = data || [];
        this.cargando = false;
      },
      error: () => { 
        this.proveedores = [];
        this.cargando = false; }
    });
  }

  registrar(): void {
    if (this.form.invalid) return;
    this.proveedorService.crear(this.form.value).subscribe({
      next: () => {
        this.snack.open('✅ Proveedor registrado correctamente', 'Cerrar', {
          duration: 3000, panelClass: ['success-snack']
        });
        this.form.reset();
        this.cargar();
      },
      error: (err) => {
        const msg = err.error?.message || 'Error al registrar proveedor';
        this.snack.open(msg, 'Cerrar', { duration: 3000, panelClass: ['error-snack'] });
      }
    });
  }

  eliminar(nit: string): void {
    if (!confirm('¿Eliminar este proveedor?')) return;
    this.proveedorService.eliminar(nit).subscribe({
      next: () => {
        this.snack.open('Proveedor eliminado', 'Cerrar', { duration: 2000 });
        this.cargar();
      },
      error: (err) => {
        const msg = err.error?.error || 'Error al eliminar el proveedor';
        this.snack.open(msg, 'Cerrar', { duration: 4000, panelClass: ['error-snack'] });
      }
    });
  }
}
