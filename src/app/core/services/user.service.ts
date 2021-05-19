import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiPaths } from 'src/app/shared/api-paths.enum';
import { environment } from 'src/environments/environment';
import { CreateUser, EditUser, User } from '../models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private registerUrl = `${environment.baseURL}${ApiPaths.Register}`;
  private userUrl = `${environment.baseURL}${ApiPaths.User}`;

  constructor(private http: HttpClient) { }


  getUser(id: string): Observable<User> {
    const path = `${this.userUrl}/${id}/`;
    return this.http.get<User>(path);
  }

  /**
   * Send a POST HTTP request to the server to register a user.
   * @param user data of the new user.
   */
   createUser(user: CreateUser): Observable<CreateUser> {
    const path = `${this.registerUrl}/`;
    return this.http.post<CreateUser>(path, user);
  }

  /**
   * Send a DELETE HTTP request to server to delete a user.
   * @param id of user to delete.
   * @returns 
   */
  deleteUser(id: string): Observable<void> {
    const path = `${this.userUrl}/${id}/`;
    return this.http.delete<void>(path);
  }

  /**
   * Send a PUT HTTP request to server to update user data.
   * @param id of user to edit.
   * @param user data updated of user.
   * @returns 
   */
  updateUser(id: string, user: EditUser): Observable<User> {
    const path = `${this.userUrl}/${id}/`;
    return this.http.put<User>(path, user);
  }

  updateAllowedVehicleTypes(userId: string, vehicleTypeIds: string[]): Observable<void> {
    const path = `${this.userUrl}/allowed-types/${userId}/`;
    return this.http.put<void>(path, vehicleTypeIds);
  }
}
