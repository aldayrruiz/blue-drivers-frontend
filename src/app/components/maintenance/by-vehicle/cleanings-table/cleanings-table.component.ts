import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';
import { BaseTableComponent } from 'src/app/components/base-table/base-table.component';
import { Cleaning, CleaningPhoto, getCleaningTypeLabel, Vehicle } from 'src/app/core/models';
import { BlueDriversRouter, MaintenanceService } from 'src/app/core/services';
import { sortByDate } from 'src/app/core/utils/maintenance-table';
import { environment } from 'src/environments/environment';

interface CleaningRow {
  id: string;
  model: string;
  brand: string;
  numberPlate: string;
  date: string;
  date_stored: string;
  type: string;
  photos: string[];
}

@Component({
  selector: 'app-cleanings-table',
  templateUrl: './cleanings-table.component.html',
  styleUrls: ['./cleanings-table.component.css'],
})
export class CleaningsTableComponent extends BaseTableComponent<Cleaning, CleaningRow> {
  columns = ['date', 'owner', 'type', 'photos'];
  vehicle: Vehicle;

  constructor(
    private maintenanceService: MaintenanceService,
    private appRouter: BlueDriversRouter,
    private route: ActivatedRoute
  ) {
    super();
    this.resolve();
  }

  preprocessData(cleanings: Cleaning[]): CleaningRow[] {
    return cleanings.map((cleaning) => ({
      id: cleaning.id,
      model: cleaning.vehicle.model,
      brand: cleaning.vehicle.brand,
      numberPlate: cleaning.vehicle.number_plate,
      date: cleaning.date,
      date_stored: cleaning.date_stored,
      ownerFullname: cleaning.owner.fullname,
      type: getCleaningTypeLabel(cleaning.type),
      photos: this.serializePhotos(cleaning.photos),
    }));
  }

  fetchDataAndUpdate() {
    this.maintenanceService
      .getCleanings(this.vehicle.id)
      .pipe(finalize(() => this.hideLoadingSpinner()))
      .subscribe({
        next: (cleanings) => this.initTable(sortByDate(cleanings)),
        error: () => {},
      });
  }

  openImage(url: string) {
    window.open(url, '_blank');
  }

  goToEditMaintenanceCard() {
    this.appRouter.goToEditCleaningCard(this.vehicle.id);
  }

  private resolve() {
    this.route.data.subscribe((data) => {
      this.vehicle = data.vehicle;
    });
  }

  private serializePhotos(photos: CleaningPhoto[]) {
    return photos.map((photo) => `${environment.fleetBaseUrl}${photo.photo}`);
  }
}
