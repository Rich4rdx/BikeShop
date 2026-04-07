import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MovimientosComponent } from './movimientos/movimientos.component';
import { AuthGuard } from '../../core/guards/auth.guard';

@NgModule({
  declarations: [MovimientosComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: '', component: MovimientosComponent, canActivate: [AuthGuard] }
    ]),
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ]
})
export class MovimientosModule {}
