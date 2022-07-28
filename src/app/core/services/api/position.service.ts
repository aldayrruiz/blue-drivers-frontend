import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from 'src/app/core/utils/api-paths.enum';
import { environment } from 'src/environments/environment';
import { Position } from '../../models/positions/position.model';

@Injectable({
  providedIn: 'root',
})
export class PositionService {
  private positionUrl = `${environment.fleetBaseUrl}${API.positions}`;

  constructor(private http: HttpClient) {}

  /**
   *
   * @returns
   */
  lastKnown(start?: string, end?: string): Observable<Position[]> {
    const path = `${this.positionUrl}/`;
    const options = { params: new HttpParams().set('start', start).set('end', end) };
    return this.http.get<Position[]>(path, options);
  }

  /**
   *
   * @returns
   */
  route(vehicleIds: string[], start: string, end: string): Observable<Position[]> {
    const path = `${this.positionUrl}/route/`;
    let params = new HttpParams();
    vehicleIds.forEach((vehicleId) => (params = params.append('vehicleId', vehicleId)));
    const options = { params: params.set('start', start).set('end', end) };
    return this.http.get<Position[]>(path, options);
  }
}
