import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  title = 'angular-material-tab-router';
  navLinks: any[];
  activeLinkIndex = -1;

  constructor(private router: Router) {
    this.navLinks = [
      {
        label: 'Users',
        link: 'users',
        index: 0,
      },
      {
        label: 'Vehicle Types',
        link: 'vehicle-types',
        index: 1,
      },
      // {
      //   label: 'Users table',
      //   link: 'users-table',
      //   index: 2,
      // },
      // {
      //   label: 'Edit user',
      //   link: 'edit-user',
      //   index: 3
      // }
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
