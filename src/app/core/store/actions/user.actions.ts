
import { Action } from '@ngrx/store';

import { IUserState } from '@app/core/store/state';

export enum UserActions {
  SetUser = '[User] Set User',
  SetUserSuccess = '[User] Set User Success',
  SetUserFailure = '[User] Set User Failure',
  GetCurrency = '[User] Get User'
}

export class SetUser implements Action {
  public readonly type = UserActions.SetUser;
  constructor(public payload: IUserState) { }
}

export class SetUserSuccess implements Action {
  public readonly type = UserActions.SetUserSuccess;
  constructor(public payload: IUserState) { }
}

export class SetUserFailure implements Action {
  public readonly type = UserActions.SetUserFailure;
}

export type CurrencyActions =
  SetUser |
  SetUserSuccess |
  SetUserFailure;
