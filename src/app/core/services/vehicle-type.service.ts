import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiPaths } from 'src/app/shared/api-paths.enum';
import { environment } from 'src/environments/environment';
import { CreateVehicleType, EditVehicleType, VehicleType } from '../models';

@Injectable({
  providedIn: 'root',
})
export class VehicleTypeService {
  private vehicleTypeUrl = `${environment.baseURL}${ApiPaths.VehicleType}`;

  constructor(private http: HttpClient) {}

  createVehicleType(
    vehicleType: CreateVehicleType
  ): Observable<CreateVehicleType> {
    const path = `${this.vehicleTypeUrl}/`;
    return this.http.post<CreateVehicleType>(path, vehicleType);
  }

  getVehicleType(id: string): Observable<VehicleType> {
    const path = `${this.vehicleTypeUrl}/${id}/`;
    return this.http.get<VehicleType>(path);
  }

  getVehicleTypes(): Observable<VehicleType[]> {
    const path = `${this.vehicleTypeUrl}/`;
    return this.http.get<VehicleType[]>(path);
  }

  update(id: string, vTypeEdit: EditVehicleType): Observable<VehicleType> {
    const path = `${this.vehicleTypeUrl}/${id}/`;
    return this.http.put<VehicleType>(path, vTypeEdit);
  }

  deleteVehicleType(id: string): Observable<void> {
    const path = `${this.vehicleTypeUrl}/${id}/`;
    return this.http.delete<void>(path);
  }
}
