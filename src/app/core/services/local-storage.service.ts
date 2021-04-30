import { Injectable } from '@angular/core';

const TOKEN: string = 'my_token';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() {}

  set(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  get(key: string) {
    return localStorage.getItem(key);
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }
}
