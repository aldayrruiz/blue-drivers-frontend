import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Reservation } from 'src/app/core/models';
import { ReservationPaginatedService } from '../../services';

@Injectable({
  providedIn: 'root',
})
export class ReservationsResolver implements Resolve<Reservation[]> {
  constructor(private reservationSrv: ReservationPaginatedService) {}

  resolve(): Observable<Reservation[]> {
    return this.reservationSrv.getAll();
  }
}
