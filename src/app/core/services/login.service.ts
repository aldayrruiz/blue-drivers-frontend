import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { ApiPaths } from 'src/app/shared/utils/api-paths.enum';

import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  LocalStorageService,
  USER_TOKEN,
  USER_ID,
} from './local-storage.service';

const path = `${environment.baseURL}${ApiPaths.AdminLogin}/`;

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    null
  );

  token = '';
  userId = '';

  constructor(private http: HttpClient, private storage: LocalStorageService) {
    this.loadToken();
  }

  loadToken(): void {
    console.log('Loading the token...');
    const receivedToken = this.storage.get(USER_TOKEN);
    if (receivedToken) {
      this.token = receivedToken;
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
    console.log('Ending the loading token');
  }

  login(credentials: { username: string; password: string }): Observable<void> {
    console.log('Login...');
    return this.http.post<void>(path, credentials).pipe(
      // data: {token: "the token", user_id: "..."}
      map((data: any) => {
        if (data) {
          this.token = data.token;
          this.storage.set(USER_TOKEN, data.token);

          this.userId = data.user_id;
          this.storage.set(USER_ID, data.user_id);
          
          this.isAuthenticated.next(true);
        }
      })
    );
  }

  logout(): void {
    this.isAuthenticated.next(false);
    this.storage.remove(USER_TOKEN);
    this.storage.remove(USER_ID);
  }

  getToken(): string {
    return this.token;
  }
}
