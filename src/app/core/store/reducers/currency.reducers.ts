
import { GlobalCurrency } from '@app/shared/interfaces';
import { ECurrencyActions, CurrencyActions } from '@app/core/store/actions/currency.actions';
import { initialCurrencyState } from '@app/core/store/state/currency.state';

export const currencyReducers = (
  state = initialCurrencyState,
  action: CurrencyActions
): GlobalCurrency => {
  switch (action.type) {
    case ECurrencyActions.SetCurrencySuccess: {
      return {
        ...state,
        name: action.payload.name,
        index: action.payload.index
      };
    }
    case ECurrencyActions.GetCurrency:
    default:
      return state;
  }
};
