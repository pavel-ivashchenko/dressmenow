
import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[appHasNumber]',
  providers: [{ provide: NG_VALIDATORS, useExisting: HasNumberDirective, multi: true }]
})
export class HasNumberDirective implements Validator {

  validate(control: AbstractControl): { [key: string]: any } | null {
    return RegExp(/\d/).test(control.value) ? null : { hasNumber: 'Необхідно ввести хоча б одну цифру' };
  }

}
