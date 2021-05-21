import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/core';
import { ApiPaths } from 'src/app/shared/utils/api-paths.enum';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersResolver implements Resolve<User[]> {
  constructor(private http: HttpClient) {}

  resolve(): Observable<User[]> {
    const path = `${environment.baseURL}${ApiPaths.User}/`;
    return this.http.get<User[]>(path);
  }
}