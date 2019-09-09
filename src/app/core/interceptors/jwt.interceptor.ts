
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from '@app/core/services';

@Injectable() export class JwtInterceptor implements HttpInterceptor {

  constructor(private authService: AuthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.getJWT() && this.authService.isValidJWT() ?
      next.handle(request.clone({ setHeaders: { Authorization: this.authService.getJWT() } })) :
        next.handle(request);
  }

}
