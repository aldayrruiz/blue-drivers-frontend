import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';

import { Vehicle } from '../..';
import { VehicleService } from '../../services';

@Injectable({
  providedIn: 'root',
})
export class VehiclesResolver implements Resolve<Vehicle[]> {
  constructor(private vehicleSrv: VehicleService) {}

  resolve(): Observable<Vehicle[]> {
    return this.vehicleSrv.getAll();
  }
}
