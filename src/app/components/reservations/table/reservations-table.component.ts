import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { isAfter, isBefore, isFuture, isPast, set } from 'date-fns';
import { finalize } from 'rxjs/operators';
import { Reservation } from 'src/app/core/models';
import {
  FleetRouter,
  ReservationService,
  SnackerService,
  TimeReservedService,
} from 'src/app/core/services';
import { formatDateTime } from 'src/app/core/utils/dates/custom-fns';
import { BaseTableComponent } from '../../base-table/base-table.component';
import { ReservationTablePdfExporter } from './pdf/exporter';

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
  columns = ['title', 'owner', 'vehicle', 'numberPlate','start', 'hourMin', 'statistics'];

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  datePicker = new FormControl();

  constructor(
    private readonly timeReservedSrv: TimeReservedService,
    private readonly reservationsSrv: ReservationService,
    private readonly snacker: SnackerService,
    private readonly ghost: FleetRouter
  ) {
    super();
  }

  get start(): Date {
    const start = this.datePicker.value;
    // const { start } = this.range.value;
    return start;
  }

  get end(): Date {
    const end = this.datePicker.value;
    if (!end) {
      return null;
    }
    // const { end }: { end: Date } = this.range.value;
    const endOfTheDay = this.getEndOfTheDay(end);
    return endOfTheDay;
  }

  preprocessData(reservations: Reservation[]): ReservationRow[] {
    return reservations.map((reservation) => ({
      id: reservation.id,
      title: reservation.title,
      owner: reservation.owner.fullname,
      vehicle: `${reservation.vehicle.brand} ${reservation.vehicle.model}`,
      startFormatted: formatDateTime(reservation.start),
      endFormatted: formatDateTime(reservation.end),
      start: reservation.start,
      end: reservation.end,
      hourMin: this.timeReservedSrv.getFromReservation(reservation),
    }));
  }

  fetchDataAndUpdate() {
    this.reservationsSrv
      .getAll()
      .pipe(finalize(() => this.hideLoadingSpinner()))
      .subscribe((reservations) => {
        this.initTable(reservations);
      });
  }

  onDateFilterChange(type: string, event: MatDatepickerInputEvent<Date>) {
    this.resetTable();
    this.updateTableByDateRangeFilter();
  }

  goToStatistics(reservationRow: ReservationRow) {
    const end = new Date(reservationRow.end);
    const reservationNotCompleted = isFuture(end);
    if (reservationNotCompleted) {
      const msg = 'La reserva debe haber ocurrido para ver las estadísticas';
      this.snacker.showError(msg);
      return;
    }

    this.ghost.goToReservationStatistics(reservationRow.id);
  }

  exportPdf() {
    const pdfExporter = new ReservationTablePdfExporter(this.dataSource.data);
    pdfExporter.export(this.start);
  }

  hasFinished(reservation: ReservationRow) {
    return isPast(new Date(reservation.end));
  }

  private updateTableByDateRangeFilter() {
    const rows = this.dataSource.filteredData; // filtered rows by search bar filter
    let newRows = rows;
    if (!this.start && !this.end) {
      return;
    } else if (this.start && this.end) {
      newRows = this.getReservationsStartedBetween(rows);
    } else if (!this.end) {
      newRows = this.getReservationsStartedAfter(rows);
    } else {
      newRows = this.getReservationsStartedBefore(rows);
    }
    this.updateTableWithRows(newRows);
  }

  private getReservationsStartedBetween(rows: ReservationRow[]) {
    return rows.filter((reservation) => {
      const reservationStart = new Date(reservation.start);
      return isAfter(reservationStart, this.start) && isBefore(reservationStart, this.end);
    });
  }

  private getReservationsStartedAfter(rows: ReservationRow[]) {
    return rows.filter((reservation) => {
      const reservationStart = new Date(reservation.start);
      return isAfter(reservationStart, this.start);
    });
  }

  private getReservationsStartedBefore(rows: ReservationRow[]) {
    return rows.filter((reservation) => {
      const reservationStart = new Date(reservation.start);
      return isBefore(reservationStart, this.end);
    });
  }

  private getEndOfTheDay(day: Date) {
    const options = { hours: 23, minutes: 59, seconds: 59, milliseconds: 59 };
    const endOfTheDay = set(day, options);
    return endOfTheDay;
  }
}
