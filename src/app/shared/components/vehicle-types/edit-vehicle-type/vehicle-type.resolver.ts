import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { VehicleType } from 'src/app/core';
import { VehicleTypeService } from 'src/app/core/services/vehicle-type.service';

@Injectable({
  providedIn: 'root'
})
export class VehicleTypeResolver implements Resolve<VehicleType> {

  constructor (private vehicleTypeSrv: VehicleTypeService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<VehicleType> {
    const vehicleTypeId = route.params['vehicleTypeId'];
    return this.vehicleTypeSrv.getVehicleType(vehicleTypeId);
  }
}
