import { Injectable } from '@angular/core';
import { Reservation } from '@core/models';
import { formatDuration } from '@core/utils/dates/custom-fns';
import { intervalToDuration } from 'date-fns';

@Injectable({ providedIn: 'root' })
export class TimeReservedService {
  getFromReservation(reservation: Reservation) {
    const start = new Date(reservation.start);
    const end = new Date(reservation.end);
    const duration = intervalToDuration({ start, end });
    return formatDuration(duration);
  }
}
