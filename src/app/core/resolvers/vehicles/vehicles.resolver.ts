import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';

import { Vehicle } from '../..';
import { environment } from '../../../../environments/environment';
import { ApiPaths } from '../../../shared/utils/api-paths.enum';

@Injectable({
  providedIn: 'root',
})
export class VehiclesResolver implements Resolve<Vehicle[]> {
  constructor(private http: HttpClient) {}

  resolve(): Observable<Vehicle[]> {
    const path = `${environment.baseURL}${ApiPaths.Vehicle}/`;
    return this.http.get<Vehicle[]>(path);
  }
}
