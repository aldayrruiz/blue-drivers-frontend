import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { ApiPaths } from 'src/app/shared/utils/api-paths.enum';

import { BehaviorSubject, Observable, from } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';
import { LocalStorageService } from './local-storage.service';

export const TOKEN_KEY = 'my_token';
const path = `${environment.baseURL}${ApiPaths.AdminLogin}/`;

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    null
  );
  
  token = '';
  constructor(private http: HttpClient, private storage: LocalStorageService) {
    this.loadToken();
  }

  loadToken() {
    console.log('Loading the token...');
    const receivedToken = this.storage.get(TOKEN_KEY);
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
      // data: {token: "the token"}
      map((data: any) => {
        if (data) {
          this.token = data.token;
          this.storage.set(TOKEN_KEY, data.token);
          this.isAuthenticated.next(true);
        }
      })
    );
  }

  logout() {
    this.isAuthenticated.next(false);
    this.storage.remove(TOKEN_KEY);
  }

  getToken(): string {
    return this.token;
  }
}
