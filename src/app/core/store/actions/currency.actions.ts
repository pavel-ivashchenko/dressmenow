
import { Action } from '@ngrx/store';
import { GlobalCurrency } from '@app/shared/interfaces';

export enum ECurrencyActions {
  SetCurrency = '[Currency] Set Currency',
  SetCurrencySuccess = '[Currency] Set Currency Success',
  SetCurrencyFailure = '[Currency] Set Currency Failure',
  GetCurrency = '[Currency] Get Currency'
}

export class SetCurrency implements Action {
  public readonly type = ECurrencyActions.SetCurrency;
  constructor(public payload: string) { }
}

export class SetCurrencySuccess implements Action {
  public readonly type = ECurrencyActions.SetCurrencySuccess;
  constructor(public payload: GlobalCurrency) { }
}

export class SetCurrencyFailure implements Action {
  public readonly type = ECurrencyActions.SetCurrencyFailure;
}

export class GetCurrency implements Action {
  public readonly type = ECurrencyActions.GetCurrency;
}

export type CurrencyActions = 
  SetCurrency |
  SetCurrencySuccess |
  SetCurrencyFailure |
  GetCurrency;
