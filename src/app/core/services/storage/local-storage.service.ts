import { Injectable } from '@angular/core';

export const USER_TOKEN = 'token';
export const USER_ID = 'user_id';
export const USER_TENANT = 'tenant';

@Injectable({ providedIn: 'root' })
export class LocalStorage {
  constructor() {}

  setUserToken(token: string) {
    this.set(USER_TOKEN, token);
  }

  setUserId(id: string) {
    this.set(USER_ID, id);
  }

  setTenant(tenant: string) {
    this.set(USER_TENANT, tenant);
  }

  getUserToken() {
    return this.get(USER_TOKEN);
  }

  getUserId() {
    return this.get(USER_ID);
  }

  getTenant() {
    return this.get(USER_TENANT);
  }

  removeAll() {
    this.remove(USER_TOKEN);
    this.remove(USER_ID);
    this.remove(USER_TENANT);
  }

  private set(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  private get(key: string): string {
    return localStorage.getItem(key);
  }

  private remove(key: string): void {
    localStorage.removeItem(key);
  }
}
