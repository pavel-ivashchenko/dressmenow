
import { ActionReducerMap } from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';
import { currencyReducers } from './currency.reducers';
import { IAppState } from '@app/core/store/state';

export const appReducers: ActionReducerMap<IAppState, any> = { // TODO investigate
  router: routerReducer,
  currency: currencyReducers
}
