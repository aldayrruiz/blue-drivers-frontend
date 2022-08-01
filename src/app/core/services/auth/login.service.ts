/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { API } from 'src/app/core/utils/api-paths.enum';
import { environment } from 'src/environments/environment';
import { Role } from '../../models';
import { LocalStorage } from '../storage/local-storage.service';

const path = `${environment.fleetBaseUrl}${API.login}/`;

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);

  token = '';
  userId = '';

  constructor(private storage: LocalStorage, private http: HttpClient) {
    this.loadToken();
  }

  loadToken() {
    const token = this.storage.getUserToken();
    if (token) {
      this.token = token;
      this.markAsAuthenticated();
    } else {
      this.markAsUnAuthenticated();
    }
  }

  login(credentials: Credentials) {
    return this.http.post<void>(path, credentials).pipe(
      // data: {token: "the token", user_id: "..."}
      map((data: any) => {
        if (data && data?.role !== Role.USER) {
          const { token, user_id, tenant } = data;
          this.storeToken(token);
          this.storeUserId(user_id);
          this.storeTenantId(tenant);
          this.markAsAuthenticated();
        }
        return data;
      })
    );
  }

  logout(): void {
    // this.token = '';
    this.markAsUnAuthenticated();
    this.storage.removeAll();
  }

  getToken(): string {
    return this.token;
  }

  private storeToken(token: string) {
    this.token = token;
    this.storage.setUserToken(token);
  }

  private storeUserId(id: string) {
    this.userId = id;
    this.storage.setUserId(id);
  }

  private storeTenantId(tenant: string) {
    this.storage.setTenant(tenant);
  }

  private markAsAuthenticated() {
    this.isAuthenticated.next(true);
  }

  private markAsUnAuthenticated() {
    this.isAuthenticated.next(false);
  }
}

interface Credentials {
  username: string; // Email must be sent into username attribute.
  password: string;
}
