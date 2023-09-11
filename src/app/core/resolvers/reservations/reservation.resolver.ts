import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Reservation } from 'src/app/core/models';
import { ReservationPaginatedService } from 'src/app/core/services';

@Injectable({
  providedIn: 'root',
})
export class ReservationResolver implements Resolve<Reservation> {
  constructor(private reservationSrv: ReservationPaginatedService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Reservation> {
    const reservationId = route.params.reservationId;
    return this.reservationSrv.get(reservationId);
  }
}
