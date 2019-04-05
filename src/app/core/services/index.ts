
import { IsShrinkedService } from './is-shrinked.service';
import { IsMobileService } from './is-mobile.service';
import { CurrencyService } from './currency.service';

export const APP_SERVICE_PROVIDERS = [
  IsShrinkedService,
  IsMobileService,
  CurrencyService
]

export {
  IsShrinkedService,
  IsMobileService,
  CurrencyService
}
