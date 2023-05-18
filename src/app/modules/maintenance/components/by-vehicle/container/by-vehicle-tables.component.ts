import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Vehicle } from '@core/models';

@Component({
  selector: 'app-by-vehicle-tables',
  templateUrl: './by-vehicle-tables.component.html',
  styleUrls: ['./by-vehicle-tables.component.css'],
})
export class MaintenanceByVehicleTablesComponent {
  vehicle: Vehicle;

  constructor(private route: ActivatedRoute) {
    this.resolve();
  }

  resolve() {
    this.route.data.subscribe((data) => {
      this.vehicle = data.vehicle;
    });
  }
}
