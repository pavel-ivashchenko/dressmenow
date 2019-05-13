
import { GlobalCurrency } from '@app/shared/interfaces';
import { CURRENCY_CONSTANTS } from '@app/shared/constants';

export interface ICurrencyState extends GlobalCurrency {
  isSwitchAvailable: boolean;
}

export const initialCurrencyState: ICurrencyState = {
  name:  CURRENCY_CONSTANTS.DEFAULT_CURRENCY,
  index: CURRENCY_CONSTANTS.DEFAULT_CURRENCY_INDEX,
  isSwitchAvailable: true
};
