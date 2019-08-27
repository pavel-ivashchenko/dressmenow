
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

import { AuthenticationService } from '@app/core/services';

@Injectable() export class ErrorInterceptor implements HttpInterceptor {

  private MAT_SNACKBAR_DURATION = 5000;

  constructor(
    private snackBar: MatSnackBar,
    private authenticationService: AuthenticationService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          
          // TODO refactor error handling
          
          if (error.status === 401) {
            this.authenticationService.logout();
            location.reload(true);
          }
          const errRespText = error && error.error.reason ?
            `Помилка: ${error.error.reason}` :
            `Помилочка.. Спробуйте оновити сторiнку`;
          this.snackBar.open(errRespText, 'Зрозумiло', { duration: this.MAT_SNACKBAR_DURATION });
          return throwError(error);
        })
      );
  }

}
