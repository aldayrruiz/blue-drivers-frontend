import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiPaths } from 'src/app/shared/utils/api-paths.enum';
import { environment } from 'src/environments/environment';
import { CreateUser, EditUser, User } from '../models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private registerUrl = `${environment.baseURL}${ApiPaths.Register}`;
  private userUrl = `${environment.baseURL}${ApiPaths.User}`;

  constructor(private http: HttpClient) { }

  getAll(evenDisabled: boolean): Observable<User[]> {
    const strEvenDisabled = evenDisabled ? 'True' : 'False';
    const options = { params: new HttpParams().set('even_disabled', strEvenDisabled)};
    const path = `${this.userUrl}/`;
    return this.http.get<User[]>(path, options);
  }

  get(id: string): Observable<User> {
    const path = `${this.userUrl}/${id}/`;
    return this.http.get<User>(path);
  }

  /**
   * Send a POST HTTP request to the server to register a user.
   * @param user data of the new user.
   */
   create(user: CreateUser): Observable<CreateUser> {
    const path = `${this.registerUrl}/`;
    return this.http.post<CreateUser>(path, user);
  }

  /**
   * Send a DELETE HTTP request to server to delete a user.
   * @param id of user to delete.
   * @returns 
   */
  delete(id: string): Observable<void> {
    const path = `${this.userUrl}/${id}/`;
    return this.http.delete<void>(path);
  }

  /**
   * Send a PUT HTTP request to server to update user data.
   * @param id of user to edit.
   * @param user data updated of user.
   * @returns 
   */
  update(id: string, user: EditUser): Observable<User> {
    const path = `${this.userUrl}/${id}/`;
    return this.http.put<User>(path, user);
  }

  updateAllowedVehicles(userId: string, vehicleIds: string[]): Observable<void> {
    const path = `${this.userUrl}/allowed-vehicles/${userId}/`;
    return this.http.put<void>(path, vehicleIds);
  }

  patch(userId: string, data: EditUser): Observable<EditUser> {
    const path = `${this.userUrl}/${userId}/`;
    return this.http.patch<EditUser>(path, data);
  }
}
