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
  private positionUrl = `${environment.fleetBaseUrl}${API.lastPositions}`;

  constructor(private http: HttpClient) {}

  /**
   *
   * @returns
   */
  getAll(): Observable<Position[]> {
    const path = `${this.positionUrl}/`;
    return this.http.get<Position[]>(path);
  }

  /**
   *
   * @returns
   */
  getFromVehicle(vehicleId: string, start: string, end: string): Observable<Position[]> {
    const path = `${this.positionUrl}/vehicle/`;
    const options = {
      params: new HttpParams().set('vehicleId', vehicleId).set('start', start).set('end', end),
    };
    return this.http.get<Position[]>(path, options);
  }
}
