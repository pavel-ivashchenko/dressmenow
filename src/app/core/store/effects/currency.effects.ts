

import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { of } from 'rxjs';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';
import { CurrencyService } from '@app/core/services';
import { getCurrencySymbol } from '@angular/common';

import { ECurrencyActions, GetCurrency } from './../actions/currency.actions';

@Injectable()
export class CurrencyEffects {
  @Effect()
  getCurrency$ = this._actions$.pipe(
    ofType<GetCurrency>(ECurrencyActions.GetCurrency),
    switchMap(() => this.currencyService.getGlobalCurrencyObj()),
    
  );

  constructor(
    private currencyService: CurrencyService,
    private _actions$: Actions
  ) {}

}
