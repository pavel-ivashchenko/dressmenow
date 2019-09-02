
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { environment } from '@env/environment';
import { MAT_SNACKBAR_CONSTANTS } from '@app/shared/constants';
import { User, NewUser } from '@app/shared/interfaces';

@Injectable({ providedIn: 'root' }) export class AuthenticationService {

  public currentUser$: Observable<User>;
  private errorMsgs = {
    login: 'Будь ласка, перевірте корректність email та пароля',
    register: 'Будь ласка, спробуйте ще раз або перезавантажте сторінку і введіть дані повторно'
  };
  private currentUserSubject$: BehaviorSubject<User>;
  private MAT_SNACKBAR_DURATION = MAT_SNACKBAR_CONSTANTS.MAT_SNACKBAR_DURATION;
  private MAT_SNACKBAR_OK_PHRASE = MAT_SNACKBAR_CONSTANTS.MAT_SNACKBAR_OK_PHRASE;
  private errorHandler = ({ error }: { error: { message: string } }) => {
    this.snackBar.open(error.message, this.MAT_SNACKBAR_OK_PHRASE, { duration: this.MAT_SNACKBAR_DURATION });
  }

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {
    this.currentUserSubject$ = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser$ = this.currentUserSubject$.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject$.value;
  }

  public login(login: string, password: string): Observable<any> {
    return this.http.post<any>(`${environment.baseURL}/users/authenticate`, { login, password })
      .pipe(
        map(user => {
          if (user && user.token) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject$.next(user);
          }
          return user;
        }),
        catchError((err: { error: { message: string } }) => {
          this.errorHandler({ error: { message: this.errorMsgs.login } });
          return of(null);
        })
      );
  }

  public logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject$.next(null);
  }

  public remindPassword(email: string): Observable<any> {
    return this.http.post<any>(`${environment.baseURL}/users/remindPassword`, { email });
  }

  public checkLogin(email: string): Observable<any> {
    return this.http.post<any>(`${environment.baseURL}/users/checkLogin`, { email });
  }

  public createAccount(newUser: NewUser): Observable<any> {
    return this.http.post<any>(`${environment.baseURL}/users/createAccount`, newUser)
      .pipe(
        catchError((err: { error: { message: string } }) => {
          this.errorHandler({ error: { message: this.errorMsgs.register } });
          return of(null);
        })
      );
  }

}
