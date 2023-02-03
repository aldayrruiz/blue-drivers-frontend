import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';
import { BaseTableComponent } from 'src/app/components/base-table/base-table.component';
import { Odometer, Vehicle } from 'src/app/core/models';
import {
  ErrorMessageService,
  MaintenanceService,
  SnackerService,
  VehicleService,
} from 'src/app/core/services';
import { sortByDate } from 'src/app/core/utils/maintenance-table';

interface OdometerRow {
  id: string;
  model: string;
  brand: string;
  numberPlate: string;
  date: string;
  date_stored: string;
  ownerFullname: string;
  kilometers: number;
}

@Component({
  selector: 'app-odometers-table',
  templateUrl: './odometers-table.component.html',
  styleUrls: ['./odometers-table.component.css'],
})
export class OdometersTableComponent extends BaseTableComponent<Odometer, OdometerRow> {
  currentKilometers: number;
  columns = ['date', 'owner', 'kilometers'];
  vehicle: Vehicle;
  now = new Date();

  constructor(
    private maintenanceService: MaintenanceService,
    private errorMessage: ErrorMessageService,
    private vehicleService: VehicleService,
    private snacker: SnackerService,
    private route: ActivatedRoute
  ) {
    super();
    this.resolve();
    this.fetchCurrentKilometers();
  }

  preprocessData(odometers: Odometer[]): OdometerRow[] {
    return odometers.map((odometer) => ({
      id: odometer.id,
      model: odometer.vehicle.model,
      brand: odometer.vehicle.brand,
      numberPlate: odometer.vehicle.number_plate,
      date: odometer.date,
      date_stored: odometer.date_stored,
      ownerFullname: odometer.owner.fullname,
      kilometers: odometer.kilometers,
    }));
  }

  fetchDataAndUpdate() {
    this.maintenanceService
      .getOdometers(this.vehicle.id)
      .pipe(finalize(() => this.hideLoadingSpinner()))
      .subscribe({
        next: (odometers) => this.initTable(sortByDate(odometers)),
        error: () => {},
      });
  }

  fetchCurrentKilometers() {
    this.vehicleService
      .getCurrentKilometers(this.vehicle.id)
      .pipe(finalize(() => this.hideLoadingSpinner()))
      .subscribe({
        next: (kilometers) => (this.currentKilometers = kilometers),
        error: () => {},
      });
  }

  private resolve() {
    this.route.data.subscribe((data) => {
      this.vehicle = data.vehicle;
    });
  }
}
