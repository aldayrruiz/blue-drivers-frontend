import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateVehicle, EditPatchVehicle, EditVehicle, Vehicle } from '../../models';
import { API } from '../../utils/api-paths.enum';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private vehicleUrl = `${environment.fleetBaseUrl}${API.vehicles}`;

  constructor(private http: HttpClient) {}

  create(vehicleType: CreateVehicle): Observable<CreateVehicle> {
    const path = `${this.vehicleUrl}/`;
    return this.http.post<CreateVehicle>(path, vehicleType);
  }

  get(id: string): Observable<Vehicle> {
    const options = { params: new HttpParams().set('evenDisabled', true) };
    const path = `${this.vehicleUrl}/${id}/`;
    return this.http.get<Vehicle>(path, options);
  }

  getAll(): Observable<Vehicle[]> {
    const options = { params: new HttpParams().set('evenDisabled', true) };
    const path = `${this.vehicleUrl}/`;
    return this.http.get<Vehicle[]>(path, options);
  }

  update(id: string, vehicleEdit: EditVehicle): Observable<Vehicle> {
    const path = `${this.vehicleUrl}/${id}/`;
    return this.http.put<Vehicle>(path, vehicleEdit);
  }

  delete(id: string): Observable<void> {
    const path = `${this.vehicleUrl}/${id}/`;
    return this.http.delete<void>(path);
  }

  /**
   * Send data to update partially. By the moment, just 'is_disabled' field.
   *
   * @param id of Vehicle
   * @param data To change
   * @returns Observable
   */
  patch(id: string, data: EditPatchVehicle): Observable<EditPatchVehicle> {
    const path = `${this.vehicleUrl}/${id}/`;
    return this.http.patch<EditPatchVehicle>(path, data);
  }
}
