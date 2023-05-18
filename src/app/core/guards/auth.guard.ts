import { Injectable } from '@angular/core';
import { CanLoad } from '@angular/router';
import { BlueDriversRouter, LocalStorage, LoginService } from '../services';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad {
  constructor(private blueDriversRouter: BlueDriversRouter, private loginService: LoginService, private storage: LocalStorage) {}

  async canLoad() {
    const user = this.storage.getUser();
    if (user) {
      return true;
    } else {
      this.loginService.logout();
      await this.blueDriversRouter.goToLogin();
      return false;
    }
  }
}
