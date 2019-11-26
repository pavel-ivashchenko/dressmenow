
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';

import { environment } from '@env/environment';
import { MAT_SNACKBAR_CONSTANTS, TOKEN_KEY, TOKEN_EXPIRES_KEY } from '@app/shared/constants';
import { User, NewUser, AuthResponse, ResponseError } from '@app/shared/interfaces';
import { UserService } from '@app/core/services/user-service/user.service';

@Injectable({ providedIn: 'root' }) export class AuthenticationService {

  private MAT_SNACKBAR_DURATION = MAT_SNACKBAR_CONSTANTS.MAT_SNACKBAR_DURATION;
  private MAT_SNACKBAR_OK_PHRASE = MAT_SNACKBAR_CONSTANTS.MAT_SNACKBAR_OK_PHRASE;
  private errorHandler = ({ status, error }: ResponseError) => {
    this.snackBar.open(
      `${status ? 'Error ' + status + ':' : ''}${error.message}`,
      this.MAT_SNACKBAR_OK_PHRASE,
      { duration: this.MAT_SNACKBAR_DURATION }
    );
  }

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) { }

  public login(login: string, password: string): Observable<boolean> {
    return this.http.post<AuthResponse>(`${environment.baseURL}/users/login`, { login, password })
      .pipe(
        switchMap(
          (res: AuthResponse) => {
            localStorage.setItem(TOKEN_KEY, res.token);
            localStorage.setItem(TOKEN_EXPIRES_KEY, res.expiresIn);
            return this.userService.getUser();
          }
        ),
        map((user: User) => {
          this.userService.setCurrentUser(user);
          return true;
        }),
        catchError(({ status, error }: ResponseError) => {
          return status === 401 ?
            of(false) :
              throwError(error);
        })
      );
  }

  public register(newUser: NewUser): Observable<boolean> {
    return this.http.post<boolean>(`${environment.baseURL}/users/register`, newUser)
      .pipe(
        catchError((err: ResponseError) => {
          this.errorHandler(err);
          return of(false);
        })
      );
  }

  public logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(TOKEN_EXPIRES_KEY);
    this.userService.setCurrentUser(null);
  }

  public remindPassword(email: string): Observable<boolean> {
    return this.http.post<boolean>(`${environment.baseURL}/users/remindPassword`, email);
  }

  public checkIfUserExists(email: string): Observable<boolean> {
    return this.http.post<boolean>(`${environment.baseURL}/users/checkExists`, email);
  }

  public getJWT(): string {
    return localStorage.getItem(TOKEN_KEY);
  }

  public isValidJWT(): boolean {
    return localStorage.getItem(TOKEN_EXPIRES_KEY) &&
      JSON.parse(localStorage.getItem(TOKEN_EXPIRES_KEY)) > new Date().getTime();
  }

}
