
import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[appHasSpecialChar]',
  providers: [{ provide: NG_VALIDATORS, useExisting: HasSpecialCharDirective, multi: true }]
})
export class HasSpecialCharDirective implements Validator {

  validate(control: AbstractControl): { [key: string]: any } | null {
    return RegExp(/[!@#$%/?]/).test(control.value) ? null : { hasSpecialChar: 'Необхідно ввести хоча б один спеціальний символ' };
  }

}
