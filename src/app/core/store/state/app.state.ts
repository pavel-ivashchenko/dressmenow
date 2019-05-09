
import { RouterReducerState } from '@ngrx/router-store';
import { initialCurrencyState } from './currency.state';
import { GlobalCurrency } from '@app/shared/interfaces';

export interface IAppState {
  router?: RouterReducerState; // TODO investigate
  currency: GlobalCurrency;
}

export const initialAppState: IAppState = {
  currency: initialCurrencyState
};

export function getInitialState(): IAppState {
  return initialAppState;
}
