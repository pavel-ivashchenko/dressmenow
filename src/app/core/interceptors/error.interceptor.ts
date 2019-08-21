
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

@Injectable() export class ErrorInterceptor implements HttpInterceptor {

  private MAT_SNACKBAR_DURATION = 5000;

  constructor(private snackBar: MatSnackBar) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          const errRespText = error && error.error.reason ?
            `Помилка: ${error.error.reason}` :
            `Помилочка.. Спробуйте оновити сторiнку`;
          this.snackBar.open(errRespText, 'Зрозумiло', { duration: this.MAT_SNACKBAR_DURATION });
          return throwError(error);
        })
      );
  }

}
