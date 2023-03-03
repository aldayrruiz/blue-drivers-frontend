import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';
import { BaseTableComponent } from 'src/app/components/base-table/base-table.component';
import { DeleteMaintenanceOperationComponent } from 'src/app/components/dialogs/delete-maintenance-operation/dialog.component';
import { Repairment, RepairmentPhoto, Revision, Vehicle } from 'src/app/core/models';
import {
  BlueDriversRouter,
  ErrorMessageService,
  MaintenanceService,
  SnackerService,
} from 'src/app/core/services';
import { sortByDate } from 'src/app/core/utils/maintenance-table';
import { environment } from 'src/environments/environment';

interface RepairmentRow {
  id: string;
  model: string;
  brand: string;
  numberPlate: string;
  date: string;
  date_stored: string;
  kilometers: number;
  location: string;
  description: string;
}

@Component({
  selector: 'app-repairments-table',
  templateUrl: './repairments-table.component.html',
  styleUrls: ['./repairments-table.component.css'],
})
export class RepairmentsTableComponent extends BaseTableComponent<Repairment, RepairmentRow> {
  vehicle: Vehicle;
  lastRepairment: Revision;
  columns = ['date', 'owner', 'kilometers', 'location', 'description', 'photos', 'delete'];

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

  preprocessData(repairments: Repairment[]): RepairmentRow[] {
    return repairments.map((repairment) => ({
      id: repairment.id,
      model: repairment.vehicle.model,
      brand: repairment.vehicle.brand,
      numberPlate: repairment.vehicle.number_plate,
      date: repairment.date,
      date_stored: repairment.date_stored,
      ownerFullname: repairment.owner.fullname,
      kilometers: repairment.kilometers,
      location: repairment.location,
      description: repairment.description,
      photos: this.serializePhotos(repairment.photos),
    }));
  }

  fetchDataAndUpdate() {
    this.maintenanceService
      .getRepairments(this.vehicle.id)
      .pipe(finalize(() => this.hideLoadingSpinner()))
      .subscribe({
        next: (repairments) => {
          const revisionsOrdered = sortByDate(repairments);
          this.initTable(revisionsOrdered);
        },
        error: () => {},
      });
  }

  openImage(url: string) {
    window.open(url, '_blank');
  }

  openDeleteDialog(repairmentRow: RepairmentRow) {
    const dialog = this.dialog.open(DeleteMaintenanceOperationComponent);

    dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteMaintenanceOperation(repairmentRow);
      }
    });
  }

  private deleteMaintenanceOperation(repairmentRow: RepairmentRow) {
    this.showLoadingSpinner();
    this.maintenanceService
      .deleteRepairment(repairmentRow.id)
      .pipe(finalize(() => this.hideLoadingSpinner()))
      .subscribe({
        next: () => {
          this.fetchDataAndUpdate();
        },
        error: () => {},
      });
  }

  private serializePhotos(photos: RepairmentPhoto[]) {
    return photos.map((photo) => `${environment.fleetBaseUrl}${photo.photo}`);
  }

  private resolve() {
    this.route.data.subscribe((data) => {
      this.vehicle = data.vehicle;
    });
  }
}
