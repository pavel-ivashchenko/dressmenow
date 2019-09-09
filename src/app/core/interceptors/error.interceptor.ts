
import { Injectable } from '@angular/core';
import {
  HttpInterceptor, HttpRequest, HttpHandler,
  HttpEvent, HttpErrorResponse
} from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from '@app/core/services';
import { MAT_SNACKBAR_CONSTANTS } from '@app/shared/constants';

@Injectable() export class ErrorInterceptor implements HttpInterceptor {

  private MAT_SNACKBAR_DURATION = MAT_SNACKBAR_CONSTANTS.MAT_SNACKBAR_DURATION;

  constructor(
    private snackBar: MatSnackBar,
    private authenticationService: AuthenticationService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
        catchError((error: HttpErrorResponse) => {

          // TODO refactor

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
