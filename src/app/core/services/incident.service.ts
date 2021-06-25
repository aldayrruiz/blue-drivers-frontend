import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiPaths } from 'src/app/shared/utils/api-paths.enum';
import { environment } from 'src/environments/environment';
import { CreateIncident, Incident } from '../models';

@Injectable({
  providedIn: 'root'
})
export class IncidentService {
  private incidentURL = `${environment.baseURL}${ApiPaths.Incident}`;

  constructor(private http: HttpClient) { }

  create(incident: CreateIncident): Observable<CreateIncident> {
    const path = `${this.incidentURL}/`;
    return this.http.post<CreateIncident>(path, incident);
  }

  getAll(): Observable<Incident[]> {
    const path = `${this.incidentURL}/`;
    return this.http.get<Incident[]>(path);
  }

  get(id: string): Observable<Incident> {
    const path = `${this.incidentURL}/${id}/`;
    return this.http.get<Incident>(path);
  }
}
