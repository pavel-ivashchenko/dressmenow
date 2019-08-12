
import { CheckIfEqualDirective } from './checkIfEqual/check-if-equal.directive';
import { HasCapitalCaseDirective } from './hasCapitalCase/has-capital-case.directive';
import { HasSmallCaseDirective } from './hasSmallCase/has-small-case.directive';
import { HasNumberDirective } from './hasNumber/has-number.directive';
import { HasSpecialCharDirective } from './hasSpecialChar/has-special-char.directive';

export const VALIDATORS = [
  CheckIfEqualDirective,
  HasCapitalCaseDirective,
  HasSmallCaseDirective,
  HasNumberDirective,
  HasSpecialCharDirective
];
