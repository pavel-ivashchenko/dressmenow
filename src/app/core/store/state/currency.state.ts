
import { GlobalCurrencyObject } from '@app/shared/interfaces';
import { CURRENCY_CONSTANTS } from '@app/shared/constants';

export const initialCurrencyState: GlobalCurrencyObject = {
  currency:  CURRENCY_CONSTANTS.DEFAULT_CURRENCY,
  currencyIndex: CURRENCY_CONSTANTS.DEFAULT_CURRENCY_INDEX
};
