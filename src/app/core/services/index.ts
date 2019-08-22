
import { IsShrinkedService } from './is-shrinked.service';
import { CurrencyService } from './currency.service';
import { AuthenticationService } from './authentication.service';

export const APP_SERVICE_PROVIDERS = [
  IsShrinkedService,
  CurrencyService,
  AuthenticationService
];

export {
  IsShrinkedService,
  CurrencyService,
  AuthenticationService
};
