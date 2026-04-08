import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [UsuariosComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UsuariosRoutingModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ]
})
export class UsuariosModule {}
