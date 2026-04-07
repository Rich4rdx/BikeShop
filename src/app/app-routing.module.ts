import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'ventas',
    loadChildren: () => import('./modules/ventas/ventas.module').then(m => m.VentasModule)
  },
  {
    path: 'movimientos',
    loadChildren: () => import('./modules/movimientos/movimientos.module').then(m => m.MovimientosModule)
  },
  {
    path: 'clientes',
    loadChildren: () => import('./modules/clientes/clientes.module').then(m => m.ClientesModule)
  },
  {
    path: 'bicicletas',
    loadChildren: () => import('./modules/bicicletas/bicicletas.module').then(m => m.BicicletasModule)
  },
  {
    path: 'proveedores',
    loadChildren: () => import('./modules/proveedores/proveedores.module').then(m => m.ProveedoresModule)
  },
  {
    path: 'reportes',
    loadChildren: () => import('./modules/reportes/reportes.module').then(m => m.ReportesModule)
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
