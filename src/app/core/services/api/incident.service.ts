import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateIncident, Incident } from '../../models';
import { API } from '../../utils/api-paths.enum';

@Injectable({
  providedIn: 'root',
})
export class IncidentService {
  private incidentURL = `${environment.fleetBaseUrl}${API.incidents}`;

  constructor(private http: HttpClient) {}

  create(incident: CreateIncident): Observable<CreateIncident> {
    const path = `${this.incidentURL}/`;
    return this.http.post<CreateIncident>(path, incident);
  }

  getAll(): Observable<Incident[]> {
    const options = { params: new HttpParams().set('takeAll', true) };
    const path = `${this.incidentURL}/`;
    return this.http.get<Incident[]>(path, options);
  }

  get(id: string): Observable<Incident> {
    const path = `${this.incidentURL}/${id}/`;
    return this.http.get<Incident>(path);
  }

  solve(id: string, data: { solver_message: string }) {
    const path = `${this.incidentURL}/${id}/solve/`;
    return this.http.post(path, data);
  }
}
