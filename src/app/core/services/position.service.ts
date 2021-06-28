import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiPaths } from 'src/app/shared/utils/api-paths.enum';
import { environment } from 'src/environments/environment';
import { Position } from '../models/position.model';

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  private positionUrl = `${environment.baseURL}${ApiPaths.Position}`;

  constructor(private http: HttpClient) {}

  /**
   * 
   * @returns 
   */
  getAll(): Observable<Position[]> {
    const path = `${this.positionUrl}/`;
    return this.http.get<Position[]>(path);
  }
}
