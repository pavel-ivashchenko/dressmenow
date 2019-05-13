
import { ECurrencyActions, CurrencyActions } from '@app/core/store/actions/currency.actions';
import { initialCurrencyState, ICurrencyState } from '@app/core/store/state/currency.state';

export const currencyReducers = (
  state = initialCurrencyState,
  action: CurrencyActions
): ICurrencyState => {
  switch (action.type) {
    case ECurrencyActions.SetCurrencySuccess: {
      return {
        name: action.payload.name,
        index: action.payload.index,
        isSwitchAvailable: true
      };
    }
    case ECurrencyActions.SetCurrencyFailure: {
      return {
        ...state,
        isSwitchAvailable: false
      };
    }
    default:
      return state;
  }
};
