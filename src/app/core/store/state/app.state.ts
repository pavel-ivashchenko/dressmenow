
import { RouterReducerState } from '@ngrx/router-store';
import { initialCurrencyState, ICurrencyState } from './currency.state';

export interface IAppState {
  router?: RouterReducerState; // TODO investigate
  currency: ICurrencyState;
}

export const initialAppState: IAppState = {
  currency: initialCurrencyState
};

export function getInitialState(): IAppState {
  return initialAppState;
}
