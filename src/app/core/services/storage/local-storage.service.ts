import { Injectable } from '@angular/core';
import { TenantStorage, UserStorage } from '../../models';

export const USER_TOKEN = 'token';
export const USER_ID = 'user_id';

@Injectable({ providedIn: 'root' })
export class LocalStorage {
  constructor() {}

  setUser(user: UserStorage) {
    this.set('user', JSON.stringify(user));
  }

  getUser(): UserStorage {
    return this.get('user') ? JSON.parse(this.get('user')) : null;
  }

  setTenant(tenant: TenantStorage) {
    this.set('tenant', JSON.stringify(tenant));
  }

  getTenant(): TenantStorage {
    return this.get('tenant') ? JSON.parse(this.get('tenant')) : null;
  }

  setUserToken(token: string) {
    this.set(USER_TOKEN, token);
  }

  getUserToken() {
    return this.get(USER_TOKEN);
  }

  setUserId(id: string) {
    this.set(USER_ID, id);
  }

  getUserId() {
    return this.get(USER_ID);
  }

  removeAll() {
    this.remove(USER_TOKEN);
    this.remove(USER_ID);
    this.remove('tenant');
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
