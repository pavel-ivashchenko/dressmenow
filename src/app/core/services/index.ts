
import { IsShrinkedService } from './is-shrinked.service';
import { IsMobileService } from './is-mobile.service';
import { SwitchCurrencyService } from './switch-currency.service';

export const APP_SERVICE_PROVIDERS = [
  IsShrinkedService,
  IsMobileService,
  SwitchCurrencyService
]

export {
  IsShrinkedService,
  IsMobileService,
  SwitchCurrencyService
}
