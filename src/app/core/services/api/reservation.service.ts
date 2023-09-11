import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {API} from "@core/utils/api-paths.enum";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Reservation} from "@core/models";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private reservationURL = `${environment.fleetBaseUrl}${API.reservations}`;

  constructor(private http: HttpClient) {}

  /**
   * Sends a GET HTTP request to the server to get a list of reservations.
   */
  getAll(userId?: string, vehicleId?: string, from?: string, to?: string): Observable<Reservation[]> {
    const params = new HttpParams()
      .set('takeAll', true)
      .set('ownerId', userId)
      .set('vehicleId', vehicleId)
      .set('from', from)
      .set('to', to);
    const path = `${this.reservationURL}/`;
    return this.http.get<Reservation[]>(path, { params });
  }
}
