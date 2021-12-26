import { Component } from '@angular/core';
import { format, formatDuration, intervalToDuration } from 'date-fns';
import es from 'date-fns/locale/es';
import { finalize } from 'rxjs/operators';
import { Reservation, ReservationService } from 'src/app/core';
import { PipeDates } from 'src/app/shared/utils/pipe-dates';
import { BaseTableComponent } from 'src/app/shared/utils/tables/base-table/base-table.component';

interface ReservationRow {
  id: string;
  title: string;
  owner: string;
  vehicle: string;
  start: string;
  hourMin: string;
}

@Component({
  selector: 'app-reservations-table',
  templateUrl: './reservations-table.component.html',
  styleUrls: ['./reservations-table.component.css'],
})
export class ReservationsTableComponent extends BaseTableComponent<
  Reservation,
  ReservationRow
> {
  displayedColumns: string[] = [
    'title',
    'owner',
    'vehicle',
    'start',
    'hourMin',
    'statistics',
  ];

  constructor(private reservationsSrv: ReservationService) {
    super();
  }

  getTimeReserved(reservation: Reservation): string {
    const start = new Date(reservation.start);
    const end = new Date(reservation.end);
    const duration = intervalToDuration({ start, end });
    return formatDuration(duration, { locale: es });
  }

  preprocessData(reservations: Reservation[]): ReservationRow[] {
    return reservations.map((reservation) => ({
      id: reservation.id,
      title: reservation.title,
      owner: reservation.owner.fullname,
      vehicle: `${reservation.vehicle.model} ${reservation.vehicle.brand}`,
      start: format(new Date(reservation.start), PipeDates.dateTimeFormat),
      hourMin: this.getTimeReserved(reservation),
    }));
  }

  fetchDataAndUpdate() {
    this.reservationsSrv
      .getAll()
      .pipe(finalize(() => this.hideLoadingSpinner()))
      .subscribe((reservations) => this.updateTable(reservations));
  }
}
