import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateReservation, Reservation } from '../../models';
import { API } from '../../utils/api-paths.enum';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private reservationURL = `${environment.fleetBaseUrl}${API.reservations}`;

  constructor(private http: HttpClient) {}

  /**
   * Sends a GET HTTP request to the server to get a list of reservations.
   */
  getAll(): Observable<Reservation[]> {
    const options = { params: new HttpParams().set('takeAll', true) };
    const path = `${this.reservationURL}/`;
    return this.http.get<Reservation[]>(path, options);
  }

  /**
   * Sends a GET HTTP request to the server to get a reservation given an identifier.
   *
   * @param id identifier of the reservation to get.
   */
  get(id: string): Observable<Reservation> {
    const path = `${this.reservationURL}/${id}/`;
    return this.http.get<Reservation>(path);
  }

  /**
   * Send a POST HTTP request to the server to store the given reservation data.
   *
   * @param reservation data of the reservation to store.
   */
  create(reservation: CreateReservation): Observable<CreateReservation> {
    const path = `${this.reservationURL}/`;
    return this.http.post<CreateReservation>(path, reservation);
  }

  /**
   * Sends a DELETE HTTP request to the server to delete the resource.
   *
   * @param id Reservation's id to delete
   */
  delete(id: string): Observable<void> {
    const path = `${this.reservationURL}/${id}/`;
    return this.http.delete<void>(path);
  }
}
