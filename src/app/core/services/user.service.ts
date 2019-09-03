
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '@env/environment';
import { Env } from '@app/shared/interfaces';
import { IAppState, IUserState } from '@app/core/store/state';
import { selectUserState } from '@app/core/store/selectors';
import { SetUser } from '@app/core/store/actions';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private env: Env = environment;
  private currentUserSubject$: BehaviorSubject<IUserState>;
  public currentUser$: Observable<IUserState>;

  constructor(
    private http: HttpClient,
    private store: Store<IAppState>
  ) {
    this.currentUserSubject$ = new BehaviorSubject<IUserState>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser$ = this.currentUserSubject$.asObservable();
  }

  public getUser(): Observable<any> {
    return this.http.get(this.env.baseURL + '/user')
      .pipe(
        catchError((err: Error) => {
          return throwError(err);
        })
      );
  }

  public getCurrentUser(): Observable<IUserState> {
    return this.store.pipe(select(selectUserState));
  }

  public setCurrentUser(user: IUserState): void {
    this.store.dispatch(new SetUser(user));
  }

}
