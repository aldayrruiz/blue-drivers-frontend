import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Reservation } from '../../models';
import { API } from '../../utils/api-paths.enum';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private reservationURL = `${environment.fleetBaseUrl}${API.paginatedReservations}`;

  constructor(private http: HttpClient) {}

  /**
   * Sends a GET HTTP request to the server to get a list of reservations.
   */
  getAll(page?: number, page_size?: number, userId?: string, vehicleId?: string, from?: string, to?: string): Observable<any> {
    const params = new HttpParams()
      .set('page', page)
      .set('page_size', page_size)
      .set('takeAll', true)
      .set('ownerId', userId)
      .set('vehicleId', vehicleId)
      .set('from', from)
      .set('to', to);
    const path = `${this.reservationURL}/`;
    return this.http.get<Reservation[]>(path, { params });
  }

  /**
   * Sends a GET HTTP request to the server to get a reservation given an identifier.
   *
   * @param id identifier of the reservation to get.
   */
  get(id: string): Observable<Reservation> {
    const path = `${this.reservationURL}/${id}/`;
    const params = new HttpParams().set('takeAll', true);
    return this.http.get<Reservation>(path, { params });
  }
}
