import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  Cleaning,
  CleaningCard,
  Itv,
  Odometer,
  Revision,
  Wheels,
} from '../../models';
import { API } from '../../utils/api-paths.enum';

@Injectable({ providedIn: 'root' })
export class MaintenanceService {
  private baseUrl = `${environment.fleetBaseUrl}${API.maintenance}`;
  constructor(private http: HttpClient) {}

  createCleaningCard(card: CleaningCard): Observable<CleaningCard> {
    const path = `${this.baseUrl}/cleaning-cards/`;
    return this.http.post<CleaningCard>(path, card);
  }

  updateCleaningCard(cleaningCardId: string, card: CleaningCard): Observable<CleaningCard> {
    const path = `${this.baseUrl}/cleaning-cards/${cleaningCardId}/`;
    return this.http.put<CleaningCard>(path, card);
  }

  getCleanings(vehicleId?: string): Observable<Cleaning[]> {
    const options = { params: new HttpParams().set('vehicleId', vehicleId) };
    const path = `${this.baseUrl}/cleanings/`;
    return this.http.get<Cleaning[]>(path, options);
  }

  getItvs(vehicleId?: string): Observable<Itv[]> {
    const options = { params: new HttpParams().set('vehicleId', vehicleId) };
    const path = `${this.baseUrl}/itvs/`;
    return this.http.get<Itv[]>(path, options);
  }

  getRevisions(vehicleId?: string): Observable<Revision[]> {
    const options = { params: new HttpParams().set('vehicleId', vehicleId) };
    const path = `${this.baseUrl}/revisions/`;
    return this.http.get<Revision[]>(path, options);
  }

  getOdometers(vehicleId?: string): Observable<Odometer[]> {
    const options = { params: new HttpParams().set('vehicleId', vehicleId) };
    const path = `${this.baseUrl}/odometers/`;
    return this.http.get<Odometer[]>(path, options);
  }

  getWheels(vehicleId?: string): Observable<Wheels[]> {
    const options = { params: new HttpParams().set('vehicleId', vehicleId) };
    const path = `${this.baseUrl}/wheels/`;
    return this.http.get<Wheels[]>(path, options);
  }
}
