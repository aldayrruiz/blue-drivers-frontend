import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { getWheelsLocationLabel, getWheelsOperationLabel, Vehicle, Wheels, WheelsPhoto } from '@core/models';
import { BlueDriversRouter, ErrorMessageService, MaintenanceService, SnackerService } from '@core/services';
import { sortByDate } from '@core/utils/maintenance-table';
import { DeleteMaintenanceOperationComponent } from '@modules/maintenance/dialogs/delete-maintenance-operation/dialog.component';
import { BaseTableComponent } from '@shared/components/base-table/base-table.component';
import { finalize } from 'rxjs';
import { environment } from 'src/environments/environment';

interface WheelsRow {
  id: string;
  model: string;
  brand: string;
  numberPlate: string;
  date: string;
  date_stored: string;
  ownerFullname: string;
  location: string;
  kilometers: number;
  operation: string;
  passed: string;
}

@Component({
  selector: 'app-wheels-table',
  templateUrl: './wheels-table.component.html',
  styleUrls: ['./wheels-table.component.css'],
})
export class WheelsTableComponent extends BaseTableComponent<Wheels, WheelsRow> {
  vehicle: Vehicle;
  columns = ['date', 'location', 'kilometers', 'owner', 'operation', 'passed', 'photos', 'delete'];

  constructor(
    private maintenanceService: MaintenanceService,
    private errorMessage: ErrorMessageService,
    private appRouter: BlueDriversRouter,
    private snacker: SnackerService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {
    super();
    this.resolve();
  }
  preprocessData(wheels: Wheels[]): WheelsRow[] {
    return wheels.map((wheel) => ({
      id: wheel.id,
      model: wheel.vehicle.model,
      brand: wheel.vehicle.brand,
      numberPlate: wheel.vehicle.number_plate,
      date: wheel.date,
      date_stored: wheel.date_stored,
      ownerFullname: wheel.owner.fullname,
      location: getWheelsLocationLabel(wheel.location),
      kilometers: wheel.kilometers,
      operation: getWheelsOperationLabel(wheel.operation),
      passed: wheel.passed ? 'Favorable' : 'Desfavorable',
      photos: this.serializePhotos(wheel.photos),
    }));
  }

  fetchDataAndUpdate() {
    this.maintenanceService
      .getWheels(this.vehicle.id)
      .pipe(finalize(() => this.hideLoadingSpinner()))
      .subscribe({
        next: (wheels) => this.initTable(sortByDate(wheels)),
        error: () => {},
      });
  }

  openImage(url: string) {
    window.open(url, '_blank');
  }

  openDeleteDialog(wheelsRow: WheelsRow) {
    const dialog = this.dialog.open(DeleteMaintenanceOperationComponent);

    dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteMaintenanceOperation(wheelsRow);
      }
    });
  }

  private deleteMaintenanceOperation(wheelsRow: WheelsRow) {
    this.showLoadingSpinner();
    this.maintenanceService
      .deleteWheels(wheelsRow.id)
      .pipe(finalize(() => this.hideLoadingSpinner()))
      .subscribe({
        next: () => {
          this.fetchDataAndUpdate();
        },
        error: () => {},
      });
  }

  private serializePhotos(photos: WheelsPhoto[]) {
    return photos.map((photo) => `${environment.fleetBaseUrl}${photo.photo}`);
  }

  private resolve() {
    this.route.data.subscribe((data) => {
      this.vehicle = data.vehicle;
    });
  }
}
