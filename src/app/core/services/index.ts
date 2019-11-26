
import { IsShrinkedService } from './is-shrinked.service';
import { CurrencyService } from './currency.service';
import { AuthenticationService } from './authentication.service';
import { BreakpointsService } from './breakpoints.service';
import { UserService } from './user-service/user.service';

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
