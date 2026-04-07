import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BicicletaResponse } from '../../../core/models/bicicleta.model';
import { ProveedorResponse } from '../../../core/models/proveedor.model';
import { BicicletaService } from '../../../core/services/bicicleta.service';
import { ProveedorService } from '../../../core/services/proveedor.service';

@Component({
  selector: 'app-bicicletas',
  templateUrl: './bicicletas.component.html',
  styleUrls: ['./bicicletas.component.scss']
})
export class BicicletasComponent implements OnInit {
  bicicletas: BicicletaResponse[] = [];
  proveedores: ProveedorResponse[] = []; // Aseguramos que inicie vacío
  cargando = false;
  imagenPreview: string | null = null;
  imagenBase64: string | null = null;

  tipos = ['MONTAÑA', 'RUTA', 'URBANA'];

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private bicicletaService: BicicletaService,
    private proveedorService: ProveedorService,
    private snack: MatSnackBar
  ) {
    this.form = this.fb.group({
      marca: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      modelo: ['', [Validators.required, Validators.maxLength(50)]],
      tipo: ['', Validators.required],
      nitProveedor: ['', Validators.required],
      precio: ['', [Validators.required, Validators.min(1)]],
      cantidadInventario: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.cargando = true;
    
    // Carga de Bicicletas
    this.bicicletaService.listar().subscribe({
      next: (data) => {
        this.bicicletas = data || [];
        this.cargando = false;
      },
      error: () => { 
        this.bicicletas = [];
        this.cargando = false; 
      }
    });

    // Carga de Proveedores (Para el Select)
    this.proveedorService.listar().subscribe({
      next: (data) => { 
        this.proveedores = data || []; 
      },
      error: () => {
        this.proveedores = [];
        this.snack.open('Error al cargar la lista de proveedores', 'Cerrar', { duration: 3000 });
      }
    });
  }

  onImagenSeleccionada(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      this.snack.open('Solo se permiten imágenes', 'Cerrar', { duration: 2000 });
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      this.snack.open('La imagen no puede superar 2 MB', 'Cerrar', { duration: 2000 });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      this.imagenPreview = result;
      this.imagenBase64 = result;
    };
    reader.readAsDataURL(file);
  }

  quitarImagen(): void {
    this.imagenPreview = null;
    this.imagenBase64 = null;
  }

  registrar(): void {
    if (this.form.invalid) return;

    // Preparamos el objeto a enviar
    const dto = { 
      ...this.form.value,
      imagenBase64: this.imagenBase64 // Agregamos la imagen si existe
    };

    this.bicicletaService.crear(dto).subscribe({
      next: (bici) => {
        if (this.imagenBase64) {
          this.bicicletaService.saveImage(bici.codigo, this.imagenBase64);
        }
        this.snack.open('✅ Bicicleta registrada correctamente', 'Cerrar', {
          duration: 3000, panelClass: ['success-snack']
        });
        this.form.reset();
        this.imagenPreview = null;
        this.imagenBase64 = null;
        this.cargarDatos();
      },
      error: (err) => {
        const msg = err.error?.message || 'Error al registrar la bicicleta';
        this.snack.open(msg, 'Cerrar', { duration: 3000, panelClass: ['error-snack'] });
      }
    });
  }

  getBadgeClass(tipo: string): string {
    const map: Record<string, string> = {
      'MONTAÑA': 'badge-montana',
      'RUTA': 'badge-ruta',
      'URBANA': 'badge-urbana'
    };
    return map[tipo] || 'badge-default';
  }

  formatPrice(price: number): string {
    return price ? '$' + price.toLocaleString('es-CO') : '$0';
  }
}