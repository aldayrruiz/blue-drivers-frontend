import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';
import { BaseTableComponent } from 'src/app/components/base-table/base-table.component';
import {
  getWheelsLocationLabel,
  getWheelsOperationLabel,
  Vehicle,
  Wheels,
  WheelsPhoto,
} from 'src/app/core/models';
import {
  BlueDriversRouter,
  ErrorMessageService,
  MaintenanceService,
  SnackerService,
} from 'src/app/core/services';
import { sortByDate } from 'src/app/core/utils/maintenance-table';
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
  columns = ['date', 'location', 'kilometers', 'owner', 'operation', 'passed', 'photos'];

  constructor(
    private errorMessage: ErrorMessageService,
    private maintenanceService: MaintenanceService,
    private snacker: SnackerService,
    private appRouter: BlueDriversRouter,
    private route: ActivatedRoute
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

  private serializePhotos(photos: WheelsPhoto[]) {
    return photos.map((photo) => `${environment.fleetBaseUrl}${photo.photo}`);
  }

  private resolve() {
    this.route.data.subscribe((data) => {
      this.vehicle = data.vehicle;
    });
  }
}
