import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorMessageService {
  constructor() {}

  get(error: HttpErrorResponse): string {
    const errors = Object.values(error.error);
    let message = errors[0];
    if (typeof message === 'object') {
      message = message[0];
    }
    return typeof message !== 'string' ? 'Error desconocido' : message;
  }
}
