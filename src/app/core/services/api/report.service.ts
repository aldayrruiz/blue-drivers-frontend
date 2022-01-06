import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from 'src/app/shared/utils/api-paths.enum';
import { environment } from 'src/environments/environment';
import { Position } from '../../models/position.model';
import { ReportSummary } from '../../models/report.summary.model';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private reportsURL = `${environment.baseURL}${API.RESERVATION_REPORTS}`;

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

  getReservationPositions(reservationId: string): Observable<Position[]> {
    const options = {
      params: new HttpParams().set('reservationId', reservationId),
    };
    const path = `${this.reportsURL}/positions/`;
    return this.http.get<Position[]>(path, options);
  }
}