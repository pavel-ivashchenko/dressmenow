
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { environment } from '@env/environment';
import { User } from '@app/shared/interfaces';

import { IAppState, IUserState } from '@app/core/store/state';
import { selectUserState } from '@app/core/store/selectors';
import { SetUser } from '@app/core/store/actions';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private BASE_URL: string = environment.baseURL;

  constructor(
    private http: HttpClient,
    private store: Store<IAppState>
  ) { }

  public getUser(): Observable<IUserState | HttpErrorResponse> {
    return this.http.get<{ status: number; body: IUserState }>(`${ this.BASE_URL }/user`)
      .pipe(
        map(res => res.body),
        catchError((err: HttpErrorResponse) => of(err))
      );
  }

  public getCurrentUser(): Observable<User> {
    return this.store.select(selectUserState);
  }

  public setCurrentUser(user: User): void {
    this.store.dispatch(new SetUser(user));
  }

}
