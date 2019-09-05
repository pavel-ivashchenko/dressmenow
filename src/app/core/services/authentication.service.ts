
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { Observable, of } from 'rxjs';
import { map, catchError, shareReplay, switchMap } from 'rxjs/operators';

import { environment } from '@env/environment';
import { MAT_SNACKBAR_CONSTANTS } from '@app/shared/constants';
import { User, NewUser, AuthResponse } from '@app/shared/interfaces';
import { UserService } from '@app/core/services/user.service';
import { TOKEN_KEY, TOKEN_EXPIRES_KEY } from '@app/shared/constants';

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

  // TODO remove the line and uncomment when server is ready

  public login(login: string, password: string): Observable<User | null> {
    return this.http.post<AuthResponse>(`${environment.baseURL}/users/login`, { login, password })
      .pipe(
        switchMap(
          (res: AuthResponse | null) => {
            if (res) {
              localStorage.setItem(TOKEN_KEY, res.token);
              localStorage.setItem(TOKEN_EXPIRES_KEY, res.expiresIn);
              return this.userService.getUser();
            }
          }
        ),
        map((user: User | null) => {
          if (user) { this.userService.setCurrentUser(user); }
          return user;
        }),
        catchError((err: { error: { message: string } }) => {
          this.errorHandler({ error: { message: this.errorMsgs.login } });
          return of(null);
        }),
        shareReplay()
      );
  }

  public logout(): void {
    localStorage.removeItem('currentUser');
    // localStorage.removeItem(TOKEN_KEY);
    this.userService.setCurrentUser(null);
  }

  public register(newUser: NewUser): Observable<User> {
    return this.http.post<User>(`${environment.baseURL}/users/register`, newUser)
      .pipe(
        catchError((err: { error: { message: string } }) => {
          this.errorHandler({ error: { message: this.errorMsgs.register } });
          return of(null);
        }),
        shareReplay()
      );
  }

  public remindPassword(email: string): Observable<boolean> {
    return this.http.post<boolean>(`${environment.baseURL}/users/remind`, { email });
  }

  public checkLogin(email: string): Observable<boolean> {
    return this.http.post<boolean>(`${environment.baseURL}/users/checkLogin`, { email });
  }

}
