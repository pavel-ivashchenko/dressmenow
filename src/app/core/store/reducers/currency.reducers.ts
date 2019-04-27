
import { ECurrencyActions, CurrencyActions } from '../actions/currency.actions';
import { initialCurrencyState } from '../state/currency.state';
import { GlobalCurrencyObject } from '@app/shared/interfaces';

export const currencyReducers = (
  state = initialCurrencyState,
  action: CurrencyActions
): GlobalCurrencyObject => {
  switch (action.type) {
    case ECurrencyActions.SetCurrency: {
      return {
        ...state,
        currency: action.payload
      }
    }
    case ECurrencyActions.GetCurrency: {
      return state
    }
    default:
      return state
  }
}
