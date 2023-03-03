import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  Cleaning,
  CleaningCard,
  Itv,
  Odometer,
  OdometerCard,
  Repairment,
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

  getOdometerCard() {
    const path = `${this.baseUrl}/odometer-cards/get/`;
    return this.http.get<OdometerCard>(path);
  }

  createOdometerCard(card: OdometerCard): Observable<OdometerCard> {
    const path = `${this.baseUrl}/odometer-cards/`;
    return this.http.post<OdometerCard>(path, card);
  }

  updateOdometerCard(card: OdometerCard): Observable<OdometerCard> {
    const path = `${this.baseUrl}/odometer-cards/`;
    return this.http.put<OdometerCard>(path, card);
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

  getRepairments(vehicleId?: string): Observable<Repairment[]> {
    const options = { params: new HttpParams().set('vehicleId', vehicleId) };
    const path = `${this.baseUrl}/repairments/`;
    return this.http.get<Repairment[]>(path, options);
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

  deleteCleaning(id: string) {
    const path = `${this.baseUrl}/cleanings/${id}/`;
    return this.http.delete(path);
  }

  deleteItv(id: string) {
    const path = `${this.baseUrl}/itvs/${id}/`;
    return this.http.delete(path);
  }

  deleteOdometer(id: string) {
    const path = `${this.baseUrl}/odometers/${id}/`;
    return this.http.delete(path);
  }
  deleteRepairment(id: string) {
    const path = `${this.baseUrl}/repairments/${id}/`;
    return this.http.delete(path);
  }

  deleteRevision(id: string) {
    const path = `${this.baseUrl}/revisions/${id}/`;
    return this.http.delete(path);
  }

  deleteWheels(id: string) {
    const path = `${this.baseUrl}/wheels/${id}/`;
    return this.http.delete(path);
  }
}
