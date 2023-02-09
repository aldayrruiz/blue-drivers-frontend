import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';
import { BaseTableComponent } from 'src/app/components/base-table/base-table.component';
import { DeleteMaintenanceOperationComponent } from 'src/app/components/dialogs/delete-maintenance-operation/dialog.component';
import { Revision, RevisionPhoto, Vehicle } from 'src/app/core/models';
import {
  BlueDriversRouter,
  ErrorMessageService,
  MaintenanceService,
  SnackerService,
} from 'src/app/core/services';
import { environment } from 'src/environments/environment';

interface RevisionRow {
  id: string;
  model: string;
  brand: string;
  numberPlate: string;
  date: string;
  date_stored: string;
  kilometers: number;
  motive: string;
  garage: string;
  nextRevision: string;
  nextKilometers: number;
}

@Component({
  selector: 'app-revisions-table',
  templateUrl: './revisions-table.component.html',
  styleUrls: ['./revisions-table.component.css'],
})
export class RevisionsTableComponent extends BaseTableComponent<Revision, RevisionRow> {
  vehicle: Vehicle;
  lastRevision: Revision;
  columns = [
    'date',
    'owner',
    'kms',
    'motive',
    'garage',
    'nextRevision',
    'nextKilometers',
    'photos',
    'delete'
  ];

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

  preprocessData(revisions: Revision[]): RevisionRow[] {
    return revisions.map((revision) => ({
      id: revision.id,
      model: revision.vehicle.model,
      brand: revision.vehicle.brand,
      numberPlate: revision.vehicle.number_plate,
      date: revision.date,
      date_stored: revision.date_stored,
      ownerFullname: revision.owner.fullname,
      kilometers: revision.kilometers,
      motive: revision.motive,
      garage: revision.garage,
      nextRevision: revision.next_revision,
      nextKilometers: revision.next_kilometers,
      photos: this.serializePhotos(revision.photos),
    }));
  }

  fetchDataAndUpdate() {
    this.maintenanceService
      .getRevisions(this.vehicle.id)
      .pipe(finalize(() => this.hideLoadingSpinner()))
      .subscribe({
        next: (revisions) => {
          const revisionsOrdered = this.sortByNextRevision(revisions);
          this.initTable(revisionsOrdered);
          this.lastRevision = revisionsOrdered[0];
        },
        error: () => {},
      });
  }

  openImage(url: string) {
    window.open(url, '_blank');
  }

  openDeleteDialog(revisionRow: RevisionRow) {
    const dialog = this.dialog.open(DeleteMaintenanceOperationComponent);

    dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteMaintenanceOperation(revisionRow);
      }
    });
  }

  private deleteMaintenanceOperation(revisionRow: RevisionRow) {
    this.showLoadingSpinner();
    this.maintenanceService
      .deleteRevision(revisionRow.id)
      .pipe(finalize(() => this.hideLoadingSpinner()))
      .subscribe({
        next: () => {
          this.fetchDataAndUpdate();
        },
        error: () => {},
      });
  }

  private serializePhotos(photos: RevisionPhoto[]) {
    return photos.map((photo) => `${environment.fleetBaseUrl}${photo.photo}`);
  }

  private resolve() {
    this.route.data.subscribe((data) => {
      this.vehicle = data.vehicle;
    });
  }

  private sortByNextRevision(revisions: Revision[]) {
    return revisions.sort((a, b) => {
      const dateA = new Date(a.next_revision);
      const dateB = new Date(b.next_revision);
      return dateB.getTime() - dateA.getTime();
    });
  }
}
