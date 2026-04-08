import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { AdminGuard } from './core/guards/admin.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'ventas',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/ventas/ventas.module').then(m => m.VentasModule)
  },
  {
    path: 'clientes',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/clientes/clientes.module').then(m => m.ClientesModule)
  },
  {
    path: 'movimientos',
    canActivate: [AuthGuard, AdminGuard],
    loadChildren: () => import('./modules/movimientos/movimientos.module').then(m => m.MovimientosModule)
  },
  {
    path: 'bicicletas',
    canActivate: [AuthGuard, AdminGuard],
    loadChildren: () => import('./modules/bicicletas/bicicletas.module').then(m => m.BicicletasModule)
  },
  {
    path: 'proveedores',
    canActivate: [AuthGuard, AdminGuard],
    loadChildren: () => import('./modules/proveedores/proveedores.module').then(m => m.ProveedoresModule)
  },
  {
    path: 'reportes',
    canActivate: [AuthGuard, AdminGuard],
    loadChildren: () => import('./modules/reportes/reportes.module').then(m => m.ReportesModule)
  },
  {
    path: 'usuarios',
    canActivate: [AuthGuard, AdminGuard],
    loadChildren: () => import('./modules/usuarios/usuarios.module').then(m => m.UsuariosModule)
  },
  {
    path: '',
    redirectTo: 'ventas',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'ventas'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
