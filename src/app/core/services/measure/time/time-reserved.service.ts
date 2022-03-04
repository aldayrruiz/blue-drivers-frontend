import { Injectable } from '@angular/core';
import { intervalToDuration } from 'date-fns';
import { Reservation } from '../../../models';
import { formatDuration } from '../../../utils/dates/custom-fns';

@Injectable({ providedIn: 'root' })
export class TimeReservedService {
  getFromReservation(reservation: Reservation) {
    const start = new Date(reservation.start);
    const end = new Date(reservation.end);
    const duration = intervalToDuration({ start, end });
    return formatDuration(duration);
  }
}
