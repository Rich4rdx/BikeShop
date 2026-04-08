import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { filter } from 'rxjs/operators';

interface NavItem {
  label: string;
  route: string;
  icon: string;
  adminOnly?: boolean;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  currentRoute = '';

  navItems: NavItem[] = [
    { label: 'Ventas',      route: '/ventas',      icon: 'shopping_cart' },
    { label: 'Clientes',    route: '/clientes',    icon: 'people' },
    { label: 'Movimientos', route: '/movimientos', icon: 'receipt_long',    adminOnly: true },
    { label: 'Bicicletas',  route: '/bicicletas',  icon: 'directions_bike', adminOnly: true },
    { label: 'Proveedores', route: '/proveedores', icon: 'local_shipping',  adminOnly: true },
    { label: 'Reportes',    route: '/reportes',    icon: 'bar_chart',       adminOnly: true },
    { label: 'Usuarios',    route: '/usuarios',    icon: 'manage_accounts', adminOnly: true },
  ];

  constructor(
    public authService: AuthService,
    private router: Router
  ) {
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe((e: any) => {
      this.currentRoute = e.urlAfterRedirects;
    });
  }

  get navItemsFiltrados(): NavItem[] {
    if (this.authService.isAdmin()) return this.navItems;
    return this.navItems.filter(item => !item.adminOnly);
  }

  get nombre(): string {
    return this.authService.getNombre();
  }

  get rolLabel(): string {
    return this.authService.isAdmin() ? 'Administrador' : 'Trabajador';
  }

  isActive(route: string): boolean {
    return this.currentRoute.startsWith(route);
  }

  navigate(route: string): void {
    this.router.navigate([route]);
  }

  logout(): void {
    this.authService.logout();
  }
}
