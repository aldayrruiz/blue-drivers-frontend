import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalStorage } from '../services';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private storage: LocalStorage) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.storage.getUserToken();
    if (authToken) {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      req = req.clone({ setHeaders: { Authorization: `Token ${authToken}` } });
    } else {
      req = req.clone();
    }

    return next.handle(req);
  }
}
