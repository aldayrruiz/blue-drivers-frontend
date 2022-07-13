import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { API } from '../../utils/api-paths.enum';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = `${environment.fleetBaseUrl}${API.auth}`;

  constructor(private http: HttpClient) {}

  resendRegistrationEmail(userId: string): Observable<any> {
    const path = `${this.baseUrl}/${userId}/resend_registration_email/`;
    return this.http.post<any>(path, null);
  }
}
