
import { ActionReducerMap } from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';

import { IAppState } from '@app/core/store/state';
import { currencyReducers } from './currency.reducers';
import { userReducers } from './user.reducers';

export const appReducers: ActionReducerMap<IAppState, any> = { // TODO investigate
  router: routerReducer,
  currency: currencyReducers,
  user: userReducers
};
