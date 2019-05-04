
import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { CurrencyService } from '@app/core/services';

import {
  ECurrencyActions,
  SetCurrency,
  SetCurrencySuccess
} from '../actions/currency.actions';
import { GlobalCurrencyObject } from '@app/shared/interfaces';

@Injectable()
export class CurrencyEffects {

  @Effect()
  setCurrency$ = this._actions$.pipe(
    ofType<SetCurrency>(ECurrencyActions.SetCurrency),
    map(action => this.currencyService.setGlobalCurrency(action.payload)),
    switchMap(() => this.currencyService.getGlobalCurrencyObj()),
    switchMap((res: GlobalCurrencyObject) => of(new SetCurrencySuccess(res)))
  )

  constructor(
    private currencyService: CurrencyService,
    private _actions$: Actions
  ) {}

}
