import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { IsActiveMatchOptions, NavigationEnd, Router } from '@angular/router';
import { UserRole, UserStorage } from '@core/models';
import { AssetsService, BlueDriversRouter, LocalStorage, LoginService } from '@core/services';

interface NavLink {
  label: string;
  link: string;
}

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent implements OnInit {
  title = 'angular-material-tab-router';
  user: UserStorage;
  logoUrl: string;
  currentLink: any;
  navLinks: NavLink[] = [
    {
      label: 'MAPA',
      link: 'positions',
    },
    {
      label: 'RESERVAS',
      link: 'reservations',
    },
    {
      label: 'INCIDENCIAS',
      link: 'incidents',
    },
    {
      label: 'CONFLICTOS',
      link: 'tickets',
    },
    {
      label: 'USUARIOS',
      link: 'users',
    },
    {
      label: 'VEHÍCULOS',
      link: 'vehicles',
    },
    {
      label: 'MANTENIMIENTO',
      link: 'maintenance',
    },
  ];
  menuLinks: NavLink[] = [
    {
      label: 'Compañías aseguradoras',
      link: 'insurance-companies',
    },
    {
      label: 'Plantillas de reservas',
      link: 'reservation-templates',
    },
    {
      label: 'Informes mensuales',
      link: 'reports',
    },
  ];

  superAdminMenuLinks: NavLink[] = [
    {
      label: 'Crear sites',
      link: 'tenants',
    },
  ];

  constructor(
    private assetsService: AssetsService,
    private loginService: LoginService,
    private fleetRouter: BlueDriversRouter,
    private storage: LocalStorage,
    private router: Router
  ) {
    this.changeColorIfRouteChange();
  }

  ngOnInit(): void {
    const user = this.storage.getUser();
    this.user = user;
    if (user.role === UserRole.SUPER_ADMIN) {
      this.menuLinks = [...this.menuLinks, ...this.superAdminMenuLinks];
    }
    this.logoUrl = this.assetsService.getUrl('background/icon.png');
  }

  async logOut() {
    this.loginService.logout();
    await this.fleetRouter.goToLogin();
  }

  getButtonColor(link: any): ThemePalette {
    return this.currentLink === link ? 'warn' : undefined;
  }

  getButtonColorForConfig(): ThemePalette {
    const isOnConfigMenu: boolean = this.menuLinks.some((link: NavLink): boolean => this.currentLink === link);
    return isOnConfigMenu ? 'warn' : undefined;
  }

  private changeColorIfRouteChange() {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.changeColorTo(this.getCurrentLinkActive());
      }
    });
  }

  private changeColorTo(link: any) {
    this.currentLink = link;
  }

  private getCurrentLinkActive() {
    const options: IsActiveMatchOptions = {
      matrixParams: 'ignored',
      queryParams: 'ignored',
      paths: 'subset',
      fragment: 'ignored',
    };

    const links = [...this.navLinks, ...this.menuLinks];
    return links.find((link) => this.router.isActive(`admin/${link.link}`, options));
  }
}
