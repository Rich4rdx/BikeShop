import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReportesComponent } from './reportes/reportes.component';
import { AuthGuard } from '../../core/guards/auth.guard';

@NgModule({
  declarations: [ReportesComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: '', component: ReportesComponent, canActivate: [AuthGuard] }
    ]),
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ]
})
export class ReportesModule {}
