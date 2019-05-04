
import { RouterReducerState } from '@ngrx/router-store';
import { initialCurrencyState } from './currency.state';
import { GlobalCurrencyObject } from '@app/shared/interfaces';

export interface IAppState {
  router?: RouterReducerState; // TODO investigate
  currency: GlobalCurrencyObject;
}

export const initialAppState: IAppState = {
  currency: initialCurrencyState
}

export function getInitialState(): IAppState {
  return initialAppState;
}
