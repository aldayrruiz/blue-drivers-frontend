import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateUser, EditPatchUser, User } from '../../models';
import { API } from '../../utils/api-paths.enum';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private registerUrl = `${environment.fleetBaseUrl}${API.register}`;
  private userUrl = `${environment.fleetBaseUrl}${API.users}`;

  constructor(private readonly http: HttpClient) {}

  /**
   * Get users info
   *
   * @param evenDisabled if true all users will be fetched, even disabled.
   * @returns users
   */
  getAll(evenDisabled: boolean): Observable<User[]> {
    const strEvenDisabled = evenDisabled ? 'True' : 'False';
    const options = {
      params: new HttpParams().set('evenDisabled', strEvenDisabled),
    };
    const path = `${this.userUrl}/`;
    return this.http.get<User[]>(path, options);
  }

  /**
   * Get user info
   *
   * @param id
   * @returns user
   */
  get(id: string): Observable<User> {
    const path = `${this.userUrl}/${id}/`;
    return this.http.get<User>(path);
  }

  /**
   * Register / Create user
   * @param user user
   * @returns user created
   */
  create(user: CreateUser): Observable<CreateUser> {
    const path = `${this.registerUrl}/`;
    return this.http.post<CreateUser>(path, user);
  }

  /**
   * Delete a user
   * @param id user id
   * @returns
   */
  delete(id: string): Observable<void> {
    const path = `${this.userUrl}/${id}/`;
    return this.http.delete<void>(path);
  }

  /**
   * Update user profile.
   * @param id user id
   * @param user data updated of user.
   * @returns
   */
  update(id: string, user: EditPatchUser): Observable<User> {
    const path = `${this.userUrl}/${id}/`;
    return this.http.put<User>(path, user);
  }

  /**
   * Update user's vehicle permissions.
   *
   * @param id of user to update
   * @param vehicleIds array of vehicles ids
   * @returns
   */
  updateAllowedVehicles(id: string, vehicleIds: string[]): Observable<void> {
    const path = `${this.userUrl}/allowed-vehicles/${id}/`;
    return this.http.put<void>(path, vehicleIds);
  }

  /**
   * Edit only attributes of EditPatchUser -> isDisabled
   * @param id user id
   * @param data update data
   * @returns
   */
  patch(id: string, data: EditPatchUser): Observable<EditPatchUser> {
    const path = `${this.userUrl}/${id}/`;
    return this.http.patch<EditPatchUser>(path, data);
  }
}
