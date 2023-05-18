import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Position, ReportSummary } from '@core/models';
import { Observable } from 'rxjs';
import { API } from 'src/app/core/utils/api-paths.enum';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private reportsURL = `${environment.fleetBaseUrl}${API.reservationReports}`;

  constructor(private http: HttpClient) {}

  /**
   * Sends a GET HTTP request to the server to get a report summary from a reservation.
   */
  getReservationSummary(reservationId: string): Observable<ReportSummary> {
    const options = {
      params: new HttpParams().set('reservationId', reservationId),
    };
    const path = `${this.reportsURL}/summary/`;
    return this.http.get<ReportSummary>(path, options);
  }

  /**
   * Get positions given a reservation.
   *
   * @param reservationId
   * @returns
   */
  getReservationPositions(reservationId: string): Observable<Position[]> {
    const options = {
      params: new HttpParams().set('reservationId', reservationId),
    };
    const path = `${this.reportsURL}/positions/`;
    return this.http.get<Position[]>(path, options);
  }
}
