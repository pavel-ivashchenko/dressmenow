
import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[appHasCapitalCase]',
  providers: [{ provide: NG_VALIDATORS, useExisting: HasCapitalCaseDirective, multi: true }]
})
export class HasCapitalCaseDirective implements Validator {

  validate(control: AbstractControl): { [key: string]: any } | null {
    return RegExp(/[A-Z]/).test(control.value) ? null : { hasCapitalCase: 'Необхідно ввести хоча б одну велику літеру' };
  }

}
