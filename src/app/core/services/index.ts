
import { IsShrinkedService } from './is-shrinked.service';
import { CurrencyService } from './currency.service';
import { AuthenticationService } from './authentication.service';
import { UserService } from './user.service';
import { BreakpointsService } from './breakpoints.service';

export const APP_SERVICE_PROVIDERS = [
  IsShrinkedService,
  CurrencyService,
  UserService,
  AuthenticationService,
  BreakpointsService
];

export {
  IsShrinkedService,
  CurrencyService,
  UserService,
  AuthenticationService,
  BreakpointsService
};
