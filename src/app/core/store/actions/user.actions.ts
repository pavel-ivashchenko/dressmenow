
import { Action } from '@ngrx/store';

import { IUserState } from '@app/core/store/state';

export enum EUserActions {
  SetUser = '[User] Set User',
  GetUser = '[User] Get User'
}

export class SetUser implements Action {
  public readonly type = EUserActions.SetUser;
  constructor(public payload: IUserState) { }
}

export type UserActions = SetUser;
