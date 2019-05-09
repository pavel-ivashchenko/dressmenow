
import { GlobalCurrency } from '@app/shared/interfaces';
import { CURRENCY_CONSTANTS } from '@app/shared/constants';

export const initialCurrencyState: GlobalCurrency = {
  name:  CURRENCY_CONSTANTS.DEFAULT_CURRENCY,
  index: CURRENCY_CONSTANTS.DEFAULT_CURRENCY_INDEX
};
