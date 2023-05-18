import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Itv, ItvPhoto, Vehicle } from '@core/models';
import { BlueDriversRouter, ErrorMessageService, MaintenanceService, SnackerService } from '@core/services';
import { sortByDate } from '@core/utils/maintenance-table';
import { DeleteMaintenanceOperationComponent } from '@modules/maintenance/dialogs/delete-maintenance-operation/dialog.component';
import { BaseTableComponent } from '@shared/components/base-table/base-table.component';
import { finalize } from 'rxjs';
import { environment } from 'src/environments/environment';

interface ItvRow {
  id: string;
  model: string;
  brand: string;
  numberPlate: string;
  date: string;
  date_stored: string;
  ownerFullname: string;
  place: string;
  passed: string;
  nextRevision: string;
}

@Component({
  selector: 'app-itvs-table',
  templateUrl: './itvs-table.component.html',
  styleUrls: ['./itvs-table.component.css'],
})
export class ItvsTableComponent extends BaseTableComponent<Itv, ItvRow> {
  vehicle: Vehicle;
  lastItv: Itv;
  columns = ['date', 'owner', 'place', 'passed', 'next_revision', 'photos', 'delete'];

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

  preprocessData(itvs: Itv[]): ItvRow[] {
    return itvs.map((itv) => ({
      id: itv.id,
      model: itv.vehicle.model,
      brand: itv.vehicle.brand,
      numberPlate: itv.vehicle.number_plate,
      date: itv.date,
      date_stored: itv.date_stored,
      ownerFullname: itv.owner.fullname,
      place: itv.place,
      passed: itv.passed ? 'Favorable' : 'Desfavorable',
      nextRevision: itv.next_revision,
      photos: this.serializePhotos(itv.photos),
    }));
  }

  fetchDataAndUpdate() {
    this.maintenanceService
      .getItvs(this.vehicle.id)
      .pipe(finalize(() => this.hideLoadingSpinner()))
      .subscribe({
        next: (itvs) => {
          const itvOrdered = this.sortByNextRevision(itvs);
          this.initTable(sortByDate(itvOrdered));
          this.lastItv = itvOrdered[0];
        },
        error: () => {},
      });
  }

  openImage(url: string) {
    window.open(url, '_blank');
  }

  openDeleteDialog(itvRow: ItvRow) {
    const dialog = this.dialog.open(DeleteMaintenanceOperationComponent);

    dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteMaintenanceOperation(itvRow);
      }
    });
  }

  private deleteMaintenanceOperation(itvRow: ItvRow) {
    this.showLoadingSpinner();
    this.maintenanceService
      .deleteItv(itvRow.id)
      .pipe(finalize(() => this.hideLoadingSpinner()))
      .subscribe({
        next: () => {
          this.fetchDataAndUpdate();
        },
        error: () => {},
      });
  }

  private serializePhotos(photos: ItvPhoto[]) {
    return photos.map((photo) => `${environment.fleetBaseUrl}${photo.photo}`);
  }

  private resolve() {
    this.route.data.subscribe((data) => {
      this.vehicle = data.vehicle;
    });
  }

  private sortByNextRevision(itvs: Itv[]) {
    return itvs.sort((a, b) => {
      const dateA = new Date(a?.next_revision);
      const dateB = new Date(b?.next_revision);
      return dateB.getTime() - dateA.getTime();
    });
  }
}
