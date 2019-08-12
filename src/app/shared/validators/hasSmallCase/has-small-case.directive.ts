
import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[appHasSmallCase]',
  providers: [{ provide: NG_VALIDATORS, useExisting: HasSmallCaseDirective, multi: true }]
})
export class HasSmallCaseDirective implements Validator {

  validate(control: AbstractControl): { [key: string]: any } | null {
    return RegExp(/[a-z]/).test(control.value) ? null : { hasSmallCase: 'Необхідно ввести хоча б одну малу літеру' };
  }

}
