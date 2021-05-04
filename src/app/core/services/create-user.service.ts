import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiPaths } from 'src/app/shared/api-paths.enum';
import { environment } from 'src/environments/environment';
import { CreateUser } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CreateUserService {

  private createUserUrl = `${environment.baseURL}${ApiPaths.Register}`;

  constructor(private http: HttpClient) { }

  /**
   * Send a POST HTTP request to the server to register a user.
   * @param user data of the new user.
   */
   createUser(user: CreateUser): Observable<CreateUser> {
    const path = `${this.createUserUrl}/`;
    return this.http.post<CreateUser>(path, user);
  }
}
