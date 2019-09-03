
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { environment } from '@env/environment';
import { MAT_SNACKBAR_CONSTANTS } from '@app/shared/constants';
import { User, NewUser } from '@app/shared/interfaces';
import { UserService } from '@app/core/services';

@Injectable({ providedIn: 'root' }) export class AuthenticationService {

  private errorMsgs = {
    login: 'Будь ласка, перевірте корректність email та пароля',
    register: 'Будь ласка, спробуйте ще раз або перезавантажте сторінку і введіть дані повторно'
  };
  private MAT_SNACKBAR_DURATION = MAT_SNACKBAR_CONSTANTS.MAT_SNACKBAR_DURATION;
  private MAT_SNACKBAR_OK_PHRASE = MAT_SNACKBAR_CONSTANTS.MAT_SNACKBAR_OK_PHRASE;

  private errorHandler = ({ error }: { error: { message: string } }) => {
    this.snackBar.open(error.message, this.MAT_SNACKBAR_OK_PHRASE, { duration: this.MAT_SNACKBAR_DURATION });
  }

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) { }

  public login(login: string, password: string): Observable<User | null> {
    return this.http.post<any>(`${environment.baseURL}/users/login`, { login, password })
      .pipe(
        map(user => {
          if (user && user.token) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.userService.setCurrentUser(user);
          }
          return user;
        }),
        catchError((err: { error: { message: string } }) => {
          this.errorHandler({ error: { message: this.errorMsgs.login } });
          return of(null);
        })
      );
  }

  public register(newUser: NewUser): Observable<any> {
    return this.http.post<any>(`${environment.baseURL}/users/createAccount`, newUser)
      .pipe(
        catchError((err: { error: { message: string } }) => {
          this.errorHandler({ error: { message: this.errorMsgs.register } });
          return of(null);
        })
      );
  }

  public logout(): void {
    localStorage.removeItem('currentUser');
    this.userService.setCurrentUser(null);
  }

  public remindPassword(email: string): Observable<any> {
    return this.http.post<any>(`${environment.baseURL}/users/remind`, { email });
  }

  public checkLogin(email: string): Observable<any> {
    return this.http.post<any>(`${environment.baseURL}/users/checkLogin`, { email });
  }

}
