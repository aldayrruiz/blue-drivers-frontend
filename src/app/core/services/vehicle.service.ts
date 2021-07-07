import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiPaths } from 'src/app/shared/utils/api-paths.enum';
import { environment } from 'src/environments/environment';
import { CreateVehicle, Vehicle, EditVehicle } from '..';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private vehicleUrl = `${environment.baseURL}${ApiPaths.Vehicle}`;

  constructor(private http: HttpClient) {}

  create(vehicleType: CreateVehicle): Observable<CreateVehicle> {
    const path = `${this.vehicleUrl}/`;
    return this.http.post<CreateVehicle>(path, vehicleType);
  }

  get(id: string): Observable<Vehicle> {
    const options = { params: new HttpParams().set('evenDisabled', true)};
    const path = `${this.vehicleUrl}/${id}/`;
    return this.http.get<Vehicle>(path, options);
  }

  getAll(): Observable<Vehicle[]> {
    const options = { params: new HttpParams().set('evenDisabled', true)};
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
}
