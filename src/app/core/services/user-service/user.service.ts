
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { Env, User } from '@app/shared/interfaces';

import { IAppState } from '@app/core/store/state';
import { selectUserState } from '@app/core/store/selectors';
import { SetUser } from '@app/core/store/actions';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private env: Env = environment;

  constructor(
    private http: HttpClient,
    private store: Store<IAppState>
  ) { }

  public getUser(): Observable<any> {
    return this.http.get(this.env.baseURL + '/user');
  }

  public getCurrentUser(): Observable<User> {
    return this.store.pipe(select(selectUserState));
  }

  public setCurrentUser(user: User): void {
    this.store.dispatch(new SetUser(user));
  }

}
