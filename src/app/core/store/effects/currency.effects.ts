
import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { of, Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import { CurrencyService } from '@app/core/services';
import {
  ECurrencyActions,
  SetCurrency,
  SetCurrencySuccess,
  SetCurrencyFailure
} from '@app/core/store/actions/currency.actions';
import { GlobalCurrency } from '@app/shared/interfaces';

@Injectable()
export class CurrencyEffects {

  @Effect()
  setCurrency$: Observable<Action> = this._actions$.pipe(
    ofType<SetCurrency>(ECurrencyActions.SetCurrency),
    switchMap(action => this.currencyService.setGlobalCurrency(action.payload)),
    map((res: GlobalCurrency | null) => res ? new SetCurrencySuccess(res) : new SetCurrencyFailure())
  );

  constructor(
    private currencyService: CurrencyService,
    private _actions$: Actions
  ) {}

}
