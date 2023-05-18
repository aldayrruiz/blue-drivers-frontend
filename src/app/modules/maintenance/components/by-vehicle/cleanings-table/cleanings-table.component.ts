import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Cleaning, CleaningPhoto, getCleaningTypeLabel, Vehicle } from '@core/models';
import { BlueDriversRouter, MaintenanceService } from '@core/services';
import { sortByDate } from '@core/utils/maintenance-table';
import { DeleteMaintenanceOperationComponent } from '@modules/maintenance/dialogs/delete-maintenance-operation/dialog.component';
import { BaseTableComponent } from '@shared/components/base-table/base-table.component';
import * as moment from 'moment';
import { finalize } from 'rxjs';
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
  columns = ['date', 'owner', 'type', 'photos', 'delete'];
  vehicle: Vehicle;
  lastCleaning: Cleaning;
  nextCleaningDate: Date;

  constructor(
    private maintenanceService: MaintenanceService,
    private appRouter: BlueDriversRouter,
    private route: ActivatedRoute,
    private dialog: MatDialog
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
        next: (cleanings) => {
          const cleaningsOrdered = sortByDate(cleanings);
          this.lastCleaning = cleaningsOrdered[0];
          this.nextCleaningDate = this.getNextCleaningDate();
          this.initTable(cleaningsOrdered);
        },
        error: () => {},
      });
  }

  openImage(url: string) {
    window.open(url, '_blank');
  }

  goToEditMaintenanceCard() {
    this.appRouter.goToEditCleaningCard(this.vehicle.id);
  }

  openDeleteDialog(cleaningRow: CleaningRow) {
    const dialog = this.dialog.open(DeleteMaintenanceOperationComponent);

    dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteMaintenanceOperation(cleaningRow);
      }
    });
  }

  private deleteMaintenanceOperation(cleaningRow: CleaningRow) {
    this.showLoadingSpinner();
    this.maintenanceService
      .deleteCleaning(cleaningRow.id)
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

  private serializePhotos(photos: CleaningPhoto[]) {
    return photos.map((photo) => `${environment.fleetBaseUrl}${photo.photo}`);
  }
  private getNextCleaningDate() {
    if (!this.vehicle.cleaning_card || !this.lastCleaning) {
      return undefined;
    }
    const duration = moment.duration(this.vehicle.cleaning_card.date_period);
    const nextCleaning = moment(this.lastCleaning.date).add(duration).toDate();
    return nextCleaning;
  }
}
