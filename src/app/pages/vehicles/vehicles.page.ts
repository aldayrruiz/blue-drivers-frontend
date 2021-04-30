import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Vehicle } from '../../core';

@Component({
  selector: 'app-vehicles',
  templateUrl: 'vehicles.page.html',
  styleUrls: ['vehicles.page.css'],
})
export class VehiclesPage implements OnInit {
  vehicles: Vehicle[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe((response) => {
      console.log('Vehicles response received!');
      this.vehicles = response['vehicles'];
    });
  }
}
