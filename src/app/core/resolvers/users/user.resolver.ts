import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models';
import { UserService } from 'src/app/core/services';

@Injectable({
  providedIn: 'root',
})
export class UserResolver implements Resolve<User> {
  constructor(private userSrv: UserService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    const userId = route.params.userId;
    return this.userSrv.get(userId);
  }
}
