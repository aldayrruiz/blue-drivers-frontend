import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API } from 'src/app/core/utils/api-paths.enum';
import { environment } from 'src/environments/environment';
import { LocalStorage } from '../storage/local-storage.service';

const path = `${environment.baseURL}${API.LOGIN}/`;

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    null
  );

  token = '';
  userId = '';

  constructor(
    private readonly storage: LocalStorage,
    private readonly http: HttpClient
  ) {
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

  login(credentials: Credentials): Observable<void> {
    return this.http.post<void>(path, credentials).pipe(
      // data: {token: "the token", user_id: "..."}
      map((data: any) => {
        if (data) {
          const { token, user_id } = data;
          this.storeToken(token);
          this.storeUserId(user_id);
          this.markAsAuthenticated();
        }
      })
    );
  }

  logout(): void {
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
