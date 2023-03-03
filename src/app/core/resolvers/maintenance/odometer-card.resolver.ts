import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { OdometerCard } from 'src/app/core/models';
import { MaintenanceService } from 'src/app/core/services';

@Injectable({
  providedIn: 'root',
})
export class OdometerCardResolver implements Resolve<OdometerCard> {
  constructor(private maintenanceService: MaintenanceService) {}

  resolve(): Observable<OdometerCard> {
    return this.maintenanceService.getOdometerCard();
  }
}
