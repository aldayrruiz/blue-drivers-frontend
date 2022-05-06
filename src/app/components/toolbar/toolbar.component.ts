import { Component, OnInit } from '@angular/core';
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
  ];

  constructor(
    private readonly assetsService: AssetsService,
    private readonly loginService: LoginService,
    private readonly fleetRouter: FleetRouter
  ) {}

  ngOnInit(): void {
    this.logoUrl = this.assetsService.getUrl('logo/blue-drivers-logo.png');
    this.changeColorTo(this.navLinks[0]);
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
}
