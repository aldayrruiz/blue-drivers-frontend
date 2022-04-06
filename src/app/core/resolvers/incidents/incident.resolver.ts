import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Incident } from '../../models';
import { IncidentService } from '../../services';

@Injectable({
  providedIn: 'root',
})
export class IncidentResolver implements Resolve<Incident> {
  constructor(private incidentSrv: IncidentService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Incident> {
    const incidentId = route.params.incidentId;
    return this.incidentSrv.get(incidentId);
  }
}
