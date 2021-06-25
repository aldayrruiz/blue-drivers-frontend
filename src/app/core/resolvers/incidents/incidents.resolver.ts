import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Incident } from '../../models';
import { IncidentService } from '../../services';

@Injectable({
  providedIn: 'root',
})
export class IncidentsResolver implements Resolve<Incident[]> {
  constructor(private incidentSrv: IncidentService) {}

  resolve(): Observable<Incident[]> {
    return this.incidentSrv.getAll();
  }
}
