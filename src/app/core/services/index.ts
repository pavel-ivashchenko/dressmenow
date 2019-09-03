
import { IsShrinkedService } from './is-shrinked.service';
import { CurrencyService } from './currency.service';
import { AuthenticationService } from './authentication.service';
import { UserService } from './user.service';

export const APP_SERVICE_PROVIDERS = [
  IsShrinkedService,
  CurrencyService,
  UserService,
  AuthenticationService
];

export {
  IsShrinkedService,
  CurrencyService,
  UserService,
  AuthenticationService
};
