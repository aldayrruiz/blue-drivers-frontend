import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../../models';
import { UserService } from '../../services';

@Injectable({
  providedIn: 'root',
})
export class UsersResolver implements Resolve<User[]> {
  constructor(private userSrv: UserService) {}

  resolve(): Observable<User[]> {
    return this.userSrv.getAll(true);
  }
}
