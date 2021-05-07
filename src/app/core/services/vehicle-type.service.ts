import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiPaths } from 'src/app/shared/api-paths.enum';
import { environment } from 'src/environments/environment';
import { CreateVehicleType } from '../models';

@Injectable({
  providedIn: 'root',
})
export class VehicleTypeService {
  private createVehicleTypeUrl = `${environment.baseURL}${ApiPaths.VehicleType}`;

  constructor(private http: HttpClient) {}

  createVehicleType(
    vehicleType: CreateVehicleType
  ): Observable<CreateVehicleType> {
    const path = `${this.createVehicleTypeUrl}/`;
    return this.http.post<CreateVehicleType>(path, vehicleType);
  }
}
