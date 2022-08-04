/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
  constructor(private storage: LocalStorage, private http: HttpClient) {}

  login(credentials: Credentials) {
    return this.http.post<void>(path, credentials).pipe(
      // data: {token: "the token", user_id: "..."}
      map((data: any) => {
        if (data && data?.role !== Role.USER) {
          const { token, user_id, tenant } = data;
          this.storeUser(data);
          this.storeToken(token);
          this.storeUserId(user_id);
          this.storeTenantId(tenant);
        }
        return data;
      })
    );
  }

  logout(): void {
    this.storage.removeAll();
  }

  private storeUser(data: any) {
    const { user_id, email, fullname, role } = data;
    this.storage.setUser({ id: user_id, email, fullname, role });
  }

  private storeToken(token: string) {
    this.storage.setUserToken(token);
  }

  private storeUserId(id: string) {
    this.storage.setUserId(id);
  }

  private storeTenantId(tenant: string) {
    this.storage.setTenant(tenant);
  }
}

interface Credentials {
  username: string; // Email must be sent into username attribute.
  password: string;
}
