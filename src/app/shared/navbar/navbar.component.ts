import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { filter } from 'rxjs/operators';

interface NavItem {
  label: string;
  route: string;
  icon: string;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  currentRoute = '';

  navItems: NavItem[] = [
    { label: 'Ventas', route: '/ventas', icon: 'shopping_cart' },
    { label: 'Movimientos', route: '/movimientos', icon: 'receipt_long' },
    { label: 'Clientes', route: '/clientes', icon: 'people' },
    { label: 'Bicicletas', route: '/bicicletas', icon: 'directions_bike' },
    { label: 'Proveedores', route: '/proveedores', icon: 'local_shipping' },
    { label: 'Reportes', route: '/reportes', icon: 'bar_chart' },
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

  isActive(route: string): boolean {
    return this.currentRoute.startsWith(route);
  }

  navigate(route: string): void {
    this.router.navigate([route]);
  }

  logout(): void {
    this.authService.logout();
  }

  get username(): string {
    return this.authService.getUsername();
  }
}
