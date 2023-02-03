import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';
import { BaseTableComponent } from 'src/app/components/base-table/base-table.component';
import { Itv, ItvPhoto, Vehicle } from 'src/app/core/models';
import {
  BlueDriversRouter,
  ErrorMessageService,
  MaintenanceService,
  SnackerService,
} from 'src/app/core/services';
import { sortByDate } from 'src/app/core/utils/maintenance-table';
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
  columns = ['date', 'owner', 'place', 'passed', 'next_revision', 'photos'];

  constructor(
    private errorMessage: ErrorMessageService,
    private maintenanceService: MaintenanceService,
    private snacker: SnackerService,
    private route: ActivatedRoute,
    private appRouter: BlueDriversRouter
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
