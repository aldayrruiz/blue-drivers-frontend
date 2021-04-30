import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';

import { LoginService } from '../services/login.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private loginService: LoginService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authToken = this.loginService.getToken();
    if (authToken) {
      req = req.clone({ setHeaders: { Authorization: `Token ${authToken}` } });
    } else {
      req = req.clone();
    }

    return next.handle(req);
  }
}
