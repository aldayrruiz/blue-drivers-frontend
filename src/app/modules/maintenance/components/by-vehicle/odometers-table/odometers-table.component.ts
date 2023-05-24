import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Odometer, Vehicle } from '@core/models';
import { BlueDriversRouter, ErrorMessageService, MaintenanceService, SnackerService, VehicleService } from '@core/services';
import { sortByDate } from '@core/utils/maintenance-table';
import { DeleteMaintenanceOperationComponent } from '@modules/maintenance/dialogs/delete-maintenance-operation/dialog.component';
import { BaseTableComponent } from '@shared/components/base-table/base-table.component';
import { finalize } from 'rxjs';

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
  columns = ['date', 'owner', 'kilometers', 'delete'];
  vehicle: Vehicle;
  now = new Date();

  constructor(
    private maintenanceService: MaintenanceService,
    private errorMessage: ErrorMessageService,
    private vehicleService: VehicleService,
    private appRouter: BlueDriversRouter,
    private snackerService: SnackerService,
    private route: ActivatedRoute,
    private dialog: MatDialog
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

  openDeleteDialog(odometerRow: OdometerRow) {
    const dialog = this.dialog.open(DeleteMaintenanceOperationComponent);

    dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteMaintenanceOperation(odometerRow);
      }
    });
  }

  goToEditMaintenanceCard() {
    this.appRouter.goToEditOdometerCard(this.vehicle.id);
  }

  private deleteMaintenanceOperation(odometerRow: OdometerRow) {
    this.showLoadingSpinner();
    this.maintenanceService
      .deleteOdometer(odometerRow.id)
      .pipe(finalize(() => this.hideLoadingSpinner()))
      .subscribe({
        next: () => {
          this.fetchDataAndUpdate();
        },
        error: () => {},
      });
  }

  private resolve() {
    this.route.data.subscribe((data) => {
      this.vehicle = data.vehicle;
    });
  }
}
