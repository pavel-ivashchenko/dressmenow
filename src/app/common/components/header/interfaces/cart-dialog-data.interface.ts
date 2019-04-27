
import { GlobalCurrencyObject } from '@app/shared/interfaces';
import { CartModalItem } from './cart-modal-item.interface';

export interface CartDialogData {
  items: CartModalItem[];
  currencyObj: GlobalCurrencyObject;
}
