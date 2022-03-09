import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Reservation } from 'src/app/core/models';
import { ReservationService } from '../../services';

@Injectable({
  providedIn: 'root',
})
export class ReservationsResolver implements Resolve<Reservation[]> {
  constructor(private reservationSrv: ReservationService) {}

  resolve(): Observable<Reservation[]> {
    return this.reservationSrv.getAll();
  }
}
