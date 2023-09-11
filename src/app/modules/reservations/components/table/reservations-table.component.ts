import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Reservation } from '@core/models';
import { ReservationPaginatedService, SnackerService, TimeReservedService } from '@core/services';
import { formatDateTime } from '@core/utils/dates/custom-fns';
import { BaseTableComponent } from '@shared/components/base-table/base-table.component';
import { isFuture, isPast } from 'date-fns';
import { finalize } from 'rxjs/operators';
import { ReservationsFilterComponent } from '../filter/reservations-filter.component';
import { ReservationTablePdfExporter } from './pdf/exporter';
import {MatTableDataSource} from "@angular/material/table";
import {ReservationService} from "@core/services/api/reservation.service";

export interface ReservationRow {
  id: string;
  title: string;
  owner: string;
  vehicle: string;
  startFormatted: string;
  endFormatted: string;
  start: string;
  end: string;
  hourMin: string;
}

@Component({
  selector: 'app-reservations-table',
  templateUrl: './reservations-table.component.html',
  styleUrls: ['./reservations-table.component.css'],
})
export class ReservationsTableComponent extends BaseTableComponent<Reservation, ReservationRow> {
  @ViewChild('reservationsFilter') reservationsFilter: ReservationsFilterComponent;

  columns = ['title', 'owner', 'vehicle', 'numberPlate', 'start', 'hourMin', 'statistics'];

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  // Pagination
  pageIndex = 0;
  length = 0;
  page = 1;
  page_size = 10;
  previous: string;
  next: string;

  constructor(
    private timeReservedSrv: TimeReservedService,
    private reservationPaginatedService: ReservationPaginatedService,
    private reservationService: ReservationService,
    private snackerService: SnackerService
  ) {
    super();
  }

  preprocessData(reservations: Reservation[]): ReservationRow[] {
    return reservations.map((reservation) => ({
      id: reservation.id,
      title: reservation.title,
      owner: reservation.owner.fullname,
      vehicle: `${reservation.vehicle.brand} ${reservation.vehicle.model}`,
      numberPlate: reservation.vehicle.number_plate,
      startFormatted: formatDateTime(reservation.start),
      endFormatted: formatDateTime(reservation.end),
      start: reservation.start,
      end: reservation.end,
      hourMin: this.timeReservedSrv.getFromReservation(reservation),
    }));
  }

  fetchDataAndUpdate() {
    this.reservationPaginatedService
      .getAll(this.page, this.page_size)
      .pipe(finalize(() => this.hideLoadingSpinner()))
      .subscribe((response) => {
        const { count, next, previous, results } = response;
        this.next = next;
        this.previous = previous;
        this.length = count;
        this.initTable(results);
      });
  }

  // Executed when click on previous or next button table
  handlePageEvent(event) {
    const { pageIndex, pageSize } = event;
    const { userId, vehicleId, from, to } = this.reservationsFilter.getData();
    this.page = pageIndex + 1;
    this.page_size = pageSize;
    this.reservationPaginatedService
      .getAll(this.page, this.page_size, userId, vehicleId, from, to)
      .pipe(finalize(() => this.hideLoadingSpinner()))
      .subscribe((response) => {
        const { count, next, previous, results } = response;
        this.next = next;
        this.previous = previous;
        this.length = count;
        this.initTable(results);
      });
  }

  // Executed when click on Search
  filterAndUpdateTable() {
    this.initTable([]);
    this.handlePageEvent({ pageIndex: 0, pageSize: this.page_size});
  }

  goToStatistics(reservationRow: ReservationRow) {
    const end = new Date(reservationRow.end);
    const reservationNotCompleted = isFuture(end);
    if (reservationNotCompleted) {
      const msg = 'La reserva debe haber ocurrido para ver las estadísticas';
      this.snackerService.showError(msg);
      return;
    }

    window.open(`admin/reservations/statistics/${reservationRow.id}`, `_blank`);
  }

  exportPdf() {
    const { userId, vehicleId, from, to } =this.reservationsFilter.getData();
    this.reservationService.getAll(userId, vehicleId, from, to).subscribe(
      {
        next: (reservations) => {
          const reservationRows = this.preprocessData(reservations);
          const pdfExporter = new ReservationTablePdfExporter(reservationRows);
          pdfExporter.export(this.reservationsFilter.range.value.from);
        },
        error: () => {
          console.log('Ha habido un error xd')
        }
      }
    )

  }

  hasFinished(reservation: ReservationRow) {
    return isPast(new Date(reservation.end));
  }
}
