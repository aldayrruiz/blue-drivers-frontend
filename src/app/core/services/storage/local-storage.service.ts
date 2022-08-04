import { Injectable } from '@angular/core';
import { UserStorage } from '../../models';

export const USER_TOKEN = 'token';
export const USER_ID = 'user_id';
export const USER_TENANT = 'tenant';

@Injectable({ providedIn: 'root' })
export class LocalStorage {
  constructor() {}

  setUser(user: UserStorage) {
    this.set('user', JSON.stringify(user));
  }

  setUserToken(token: string) {
    this.set(USER_TOKEN, token);
  }

  setUserId(id: string) {
    this.set(USER_ID, id);
  }

  setTenant(tenant: string) {
    this.set(USER_TENANT, tenant);
  }

  getUser(): UserStorage {
    return this.get('user') ? JSON.parse(this.get('user')) : null;
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
    this.remove('user');
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
