
import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import { CurrencyService } from '@app/core/services';
import {
  ECurrencyActions,
  SetCurrency,
  SetCurrencySuccess,
  SetCurrencyFailure,
  SetCustomCurrency
} from '@app/core/store/actions/currency.actions';
import { GlobalCurrency } from '@app/shared/interfaces';

@Injectable()
export class CurrencyEffects {

  @Effect()
  setCurrency$: Observable<Action> = this._actions$
    .pipe(
      ofType<SetCurrency>(ECurrencyActions.SetCurrency),
      switchMap(action => this._currencyService.setGlobalCurrency(action.payload)),
      map((res: GlobalCurrency | null) => res ?
        new SetCurrencySuccess(res) :
        new SetCurrencyFailure())
    );

  @Effect()
  setCustomCurrency$: Observable<Action> = this._actions$
    .pipe(
      ofType<SetCustomCurrency>(ECurrencyActions.SetCustomCurrency),
      switchMap(action => this._currencyService.setCustomGlobalCurrency(action.payload)),
      map((res: GlobalCurrency | null) => new SetCurrencySuccess(res))
    );

  constructor(
    private _currencyService: CurrencyService,
    private _actions$: Actions
  ) {}

}
