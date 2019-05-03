
import { Action } from '@ngrx/store';
import { GlobalCurrencyObject } from '@app/shared/interfaces';


export enum ECurrencyActions {
  SetCurrency = '[Currency] Set Currency',
  SetCurrencySuccess = '[Currency] Set Currency Success',
  GetCurrency = '[Currency] Get Currency',
  GetCurrencySuccess = '[Currency] Get Currency Success'
}

export class SetCurrency implements Action {
  public readonly type = ECurrencyActions.SetCurrency;
  constructor(public payload: string) { }
}

export class GetCurrency implements Action {
  public readonly type = ECurrencyActions.GetCurrency;
}

export class GetCurrencySuccess implements Action {
  public readonly type = ECurrencyActions.GetCurrencySuccess;
  constructor(public payload: GlobalCurrencyObject) { }
}

export type CurrencyActions = SetCurrency | GetCurrency;
