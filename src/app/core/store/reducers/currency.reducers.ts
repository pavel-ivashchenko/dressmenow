
import { GlobalCurrency } from '@app/shared/interfaces';
import { ECurrencyActions, CurrencyActions } from '../actions/currency.actions';
import { initialCurrencyState } from '../state/currency.state';

export const currencyReducers = (
  state = initialCurrencyState,
  action: CurrencyActions
): GlobalCurrency => {
  switch (action.type) {
    case ECurrencyActions.SetCurrency: {
      return {
        ...state,
        name: action.payload
      };
    }
    case ECurrencyActions.GetCurrency: 
      return state;
    default:
      return state;
  }
};
