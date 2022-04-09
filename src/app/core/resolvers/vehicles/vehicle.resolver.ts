import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Vehicle } from '../../models';
import { VehicleService } from '../../services';

@Injectable({
  providedIn: 'root',
})
export class VehicleResolver implements Resolve<Vehicle> {
  constructor(private vehicleSrv: VehicleService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Vehicle> {
    const vehicleId = route.params.vehicleId;
    return this.vehicleSrv.get(vehicleId);
  }
}
