
import { RouterReducerState } from '@ngrx/router-store';
import { initialCurrencyState, ICurrencyState } from './currency.state';
import { initUserState, IUserState } from './user.state';

export interface IAppState {
  router?: RouterReducerState; // TODO investigate
  currency: ICurrencyState;
  user: IUserState;
}

export const initialAppState: IAppState = {
  currency: initialCurrencyState,
  user: initUserState
};

export function getInitialState(): IAppState {
  return initialAppState;
}
