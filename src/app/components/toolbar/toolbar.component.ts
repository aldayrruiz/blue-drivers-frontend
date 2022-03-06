import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FleetRouter, LoginService } from 'src/app/core/services';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent implements OnInit {
  title = 'angular-material-tab-router';
  navLinks: any[];
  activeLinkIndex = -1;

  constructor(
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
        index: 2,
      },
      {
        label: 'Incidencias',
        link: 'incidents',
        index: 3,
      },
      {
        label: 'GNSS',
        link: 'positions',
        index: 4,
      },
    ];
  }

  ngOnInit(): void {
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
