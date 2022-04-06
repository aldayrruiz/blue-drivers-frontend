import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssetsService, FleetRouter, LoginService } from 'src/app/core/services';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent implements OnInit {
  title = 'angular-material-tab-router';
  logoUrl: string;
  navLinks: any[];
  activeLinkIndex = -1;

  constructor(
    private readonly assetsService: AssetsService,
    private readonly loginService: LoginService,
    private readonly fleetRouter: FleetRouter,
    private readonly router: Router
  ) {
    this.navLinks = [
      {
        label: 'Usuarios',
        link: 'users',
        index: 0,
      },
      {
        label: 'Vehículos',
        link: 'vehicles',
        index: 1,
      },
      {
        label: 'Reservas',
        link: 'reservations',
        index: 2,
      },
      {
        label: 'Tickets',
        link: 'tickets',
        index: 3,
      },
      {
        label: 'Incidencias',
        link: 'incidents',
        index: 4,
      },
      {
        label: 'GNSS',
        link: 'positions',
        index: 5,
      },
      {
        label: 'Compañías aseguradoras',
        link: 'insurance-companies',
        index: 6,
      },
      {
        label: 'Plantillas de reservas',
        link: 'reservation-templates',
        index: 7,
      },
    ];
  }

  ngOnInit(): void {
    this.logoUrl = this.assetsService.getUrl('logo/blue-drivers-logo.png');
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(
        this.navLinks.find((tab) => tab.link === '.' + this.router.url)
      );
    });
  }

  async logOut() {
    this.loginService.logout();
    await this.fleetRouter.goToLogin();
  }
}
