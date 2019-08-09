
import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, FormGroup } from '@angular/forms';

@Directive({
  selector: '[appCheckIfEqual]',
  providers: [{ provide: NG_VALIDATORS, useExisting: CheckIfEqualDirective, multi: true }]
})
export class CheckIfEqualDirective implements Validator {

  @Input('appCheckIfEqual') appCheckIfEqual: string[] = [];

  validate(formGroup: FormGroup): { [key: string]: any } | null {

    const [ prop1, prop2, errorMsg = `Будь ласка переконайтесь, що ${prop1} дорівнює ${prop2}` ] = this.appCheckIfEqual;
    const firstCtrl = formGroup.controls[prop1];
    const secondCtrl = formGroup.controls[prop2];

    if (!this.appCheckIfEqual || this.appCheckIfEqual.length < 2 || !firstCtrl || !secondCtrl) { return null; };

    const error = { misMatch: null };
    if (firstCtrl.value !== secondCtrl.value) {
      error.misMatch = errorMsg;
      secondCtrl.setErrors({ ...secondCtrl.errors, ...error });
    } else if (secondCtrl.errors && secondCtrl.errors.misMatch) {
      secondCtrl.setErrors({ ...secondCtrl.errors, ...error });
      secondCtrl.updateValueAndValidity();
    };
    
    return error.misMatch ? error : null;

  }

}
