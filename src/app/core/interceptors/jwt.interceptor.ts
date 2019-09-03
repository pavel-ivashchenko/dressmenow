
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { take, switchMap } from 'rxjs/operators';

import { UserService } from '@app/core/services';
import { IUserState } from '@app/core/store/state';

@Injectable() export class JwtInterceptor implements HttpInterceptor {

  constructor(private userService: UserService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<IUserState>> {
    return this.userService.getCurrentUser()
      .pipe(
        take(1),
        switchMap((currentUser: IUserState) => {
          if (currentUser && currentUser.token) {
            request = request.clone({
              setHeaders: {
                Authorization: `Bearer ${currentUser.token}`
              }
            });
          }
          return next.handle(request);
        })
      );
  }

}
