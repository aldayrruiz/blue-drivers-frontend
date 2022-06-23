import { Component, OnInit } from '@angular/core';
import { IsActiveMatchOptions, Router } from '@angular/router';
import { AssetsService, FleetRouter, LoginService } from 'src/app/core/services';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent implements OnInit {
  title = 'angular-material-tab-router';
  logoUrl: string;
  currentLink: any;
  navLinks = [
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
  ];
  menuLinks = [
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

  constructor(
    private readonly assetsService: AssetsService,
    private readonly loginService: LoginService,
    private readonly fleetRouter: FleetRouter,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.logoUrl = this.assetsService.getUrl('background/icon.png');
    this.changeColorTo(this.getCurrentLinkActive());
  }

  changeColorTo(link: any) {
    this.currentLink = link;
  }

  isOnConfigPage() {
    return this.menuLinks.some((link) => this.currentLink === link);
  }

  async logOut() {
    this.loginService.logout();
    await this.fleetRouter.goToLogin();
  }

  private getCurrentLinkActive() {
    const options: IsActiveMatchOptions = {
      matrixParams: 'ignored',
      queryParams: 'ignored',
      paths: 'subset',
      fragment: 'ignored',
    };

    const links = [...this.navLinks, ...this.menuLinks];
    const currentLink = links.find((link) => this.router.isActive(`admin/${link.link}`, options));
    return currentLink;
  }
}
