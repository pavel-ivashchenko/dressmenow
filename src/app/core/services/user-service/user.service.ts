
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@env/environment';
import { Env, User, UnauthorizedError } from '@app/shared/interfaces';

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

  public getUser(): Observable<IUserState | UnauthorizedError> {
    return this.http.get<{ status: number; body: UnauthorizedError | IUserState }>(`${ this.BASE_URL }/user`)
      .pipe( map(res => res.body) );
  }

  public getCurrentUser(): Observable<User> {
    return this.store.pipe(select(selectUserState));
  }

  public setCurrentUser(user: User): void {
    this.store.dispatch(new SetUser(user));
  }

}
