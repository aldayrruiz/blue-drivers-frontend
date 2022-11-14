import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from 'src/app/core/utils/api-paths.enum';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class DietReportService {
  private url = `${environment.fleetBaseUrl}${API.dietReports}`;

  constructor(private http: HttpClient) {}

  getAll() {
    const path = `${this.url}/`;
    return this.http.get<any>(path);
  }

  view(id: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/pdf');
    const options = { headers, responseType: 'blob' as 'json' };
    const path = `${this.url}/${id}/view/`;
    return this.http.get<any>(path, options);
  }
}
