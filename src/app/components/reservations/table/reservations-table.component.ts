import { Component } from '@angular/core';
import { intervalToDuration, isFuture } from 'date-fns';
import { finalize } from 'rxjs/operators';
import { BaseTableComponent } from 'src/app/components/base-table/base-table.component';
import { Reservation, ReservationService, SnackerService } from 'src/app/core';
import { CustomRouter } from 'src/app/core/services/router/router.service';
import {
  formatDateTime,
  formatDuration,
} from 'src/app/shared/utils/dates/custom-fns';

interface ReservationRow {
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
export class ReservationsTableComponent extends BaseTableComponent<
  Reservation,
  ReservationRow
> {
  columns = ['title', 'owner', 'vehicle', 'start', 'hourMin', 'statistics'];

  constructor(
    private readonly reservationsSrv: ReservationService,
    private readonly snacker: SnackerService,
    private readonly ghost: CustomRouter
  ) {
    super();
  }

  getTimeReserved(reservation: Reservation): string {
    const start = new Date(reservation.start);
    const end = new Date(reservation.end);
    const duration = intervalToDuration({ start, end });
    return formatDuration(duration);
  }

  preprocessData(reservations: Reservation[]): ReservationRow[] {
    return reservations.map((reservation) => ({
      id: reservation.id,
      title: reservation.title,
      owner: reservation.owner.fullname,
      vehicle: `${reservation.vehicle.model} ${reservation.vehicle.brand}`,
      startFormatted: formatDateTime(reservation.start),
      endFormatted: formatDateTime(reservation.end),
      start: reservation.start,
      end: reservation.end,
      hourMin: this.getTimeReserved(reservation),
    }));
  }

  fetchDataAndUpdate() {
    this.reservationsSrv
      .getAll()
      .pipe(finalize(() => this.hideLoadingSpinner()))
      .subscribe((reservations) => this.initTable(reservations));
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
}
