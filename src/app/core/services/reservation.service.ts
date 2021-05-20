import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reservation } from '../models/reservation.model';
import { environment } from '../../../environments/environment';
import { ApiPaths } from '../../shared/utils/api-paths.enum';
import { CreateReservation } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private reservationURL = `${environment.baseURL}${ApiPaths.Reservation}`;

  constructor(private http: HttpClient) {}

  /**
   * Sends a GET HTTP request to the server to get a list of reservations.
   */
  getReservations(): Observable<Reservation[]> {
    const path = `${this.reservationURL}/`;
    return this.http.get<Reservation[]>(path);
  }

  /**
   * Sends a GET HTTP request to the server to get a reservation given an identifier.
   * @param id identifier of the reservation to get.
   */
  getReservation(id: string): Observable<Reservation> {
    const path = `${this.reservationURL}/${id}/`;
    return this.http.get<Reservation>(path);
  }

  /**
   * Send a POST HTTP request to the server to store the given reservation data.
   * @param reservation data of the reservation to store.
   */
  createReservation(reservation: CreateReservation): Observable<CreateReservation> {
    const path = `${this.reservationURL}/`;
    return this.http.post<CreateReservation>(path, reservation);
  }

  /**
   * Sends a DELETE HTTP request to the server to delete the resource.
   * @param id Reservation's id to delete
   */
  deleteReservation(id: string): Observable<void> {
    const path = `${this.reservationURL}/${id}/`;
    return this.http.delete<void>(path);
  }
}
