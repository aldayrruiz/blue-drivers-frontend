import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent implements OnInit {
  title = 'angular-material-tab-router';
  navLinks: any[];
  activeLinkIndex = -1;

  constructor(private router: Router) {
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
        label: 'Tickets',
        link: 'tickets',
        index: 2,
      },
      {
        label: 'Incidentes',
        link: 'incidents',
        index: 3
      },
      {
        label: 'Gps Positions',
        link: 'positions',
        index: 4
      }
    ];
  }

  ngOnInit(): void {
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(
        this.navLinks.find((tab) => tab.link === '.' + this.router.url)
      );
    });
  }
}
