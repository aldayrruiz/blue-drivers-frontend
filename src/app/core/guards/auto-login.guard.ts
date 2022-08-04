import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { LocalStorage } from '../services';

@Injectable({
  providedIn: 'root',
})
export class AutoLoginGuard implements CanLoad {
  constructor(private storage: LocalStorage, private router: Router) {}

  canLoad() {
    const user = this.storage.getUser();
    console.log(user);
    if (user) {
      this.router.navigateByUrl('/admin', { replaceUrl: true });
      return false;
    } else {
      return true;
    }
  }
}
