
import { Action } from '@ngrx/store';

export enum ECurrencyActions {
  SetCurrency = '[Currency] Set Currency',
  GetCurrency = '[Currency] Get Currency'
}

export class SetCurrency implements Action {
  public readonly type = ECurrencyActions.SetCurrency;
  constructor(public payload: string) { }
}

export class GetCurrency implements Action {
  public readonly type = ECurrencyActions.GetCurrency;
}

export type CurrencyActions = SetCurrency | GetCurrency;
