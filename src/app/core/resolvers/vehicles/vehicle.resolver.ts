import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Vehicle, VehicleService } from '../..';

@Injectable({
  providedIn: 'root',
})
export class VehicleResolver implements Resolve<Vehicle> {
  constructor(private vehicleSrv: VehicleService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Vehicle> {
    const vehicleId = route.params['vehicleId'];
    return this.vehicleSrv.get(vehicleId);
  }
}
