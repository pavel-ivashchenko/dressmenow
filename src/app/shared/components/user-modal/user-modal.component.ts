
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, ValidatorFn, AbstractControlOptions } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { Subject, Observable } from 'rxjs';
import { tap, scan, map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserModalComponent implements OnInit {
  
  public signInForm = new FormGroup({
    login: new FormControl(''),
    password: new FormControl('')
  });

  public sendPasswordForm = new FormGroup({
    email: new FormControl('')
  });

  public createAccountForm = new FormGroup({
    email: new FormGroup({
      email_1: new FormControl(''),
      email_2: new FormControl(''),
      sendnews: new FormControl('')
    }, this.checkIfEqual('email_1', 'email_2', 'Email адреси повинні співпадати')),
    name: new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl('')
    }),
    password: new FormControl('')
  });

  public hidePassword$: Observable<any> = new Subject().pipe(
    scan((acc) => acc = !acc, false)
  );

  public views = {
    default: 'DEFAULT',
    sendPassword: 'SEND_PASSWORD',
    createAccount: 'CREATE_ACCOUNT',
    checkEmail: 'CHECK_EMAIL'
  };

  private preventDefault$ = source$ => source$.pipe(
    map(([ event, value ]) => {
      event ? this.stopEvent(event) : null;
      return value;
    })
  )

  public currView$: any = new Subject()
    .pipe(
      this.preventDefault$,
      scan((acc, viewName) => acc = viewName, this.views.default),
      shareReplay()
    );

  public regSteps = {
    email: 'email',
    name: 'name',
    password: 'password'
  };

  public currRegStep: string = this.regSteps.email;

  constructor(private dialogRef: MatDialogRef<UserModalComponent>) { }

  ngOnInit() { }

  public onCloseModal(): void {
    this.dialogRef.close();
  }
  
  public onSignIn(): void {
    console.log('sign in works');
  }

  public onSendPassword(): void {
    this.sendPasswordForm.valid ? this.currView$.next([null, this.views.checkEmail]) : null;
  }

  public onCreateAccount(stepName: string): void {
    this.createAccountForm.controls[this.currRegStep].valid ? 
      this.currRegStep === this.regSteps.password ?
        null : this.currRegStep = stepName :
          null;
  }

  public gotoRegStep(event: MouseEvent, stepName: string): void {
    this.stopEvent(event);
    const form = this.createAccountForm.controls[stepName];
    form.valid || form.touched || form.dirty ? this.currRegStep = stepName : null;
  }

  private stopEvent(event: any): void {
    event.stopPropagation(); event.preventDefault();
  }

  private checkIfEqual(prop1: string, prop2: string, errorMsg: string): ValidatorFn | ValidatorFn[] | AbstractControlOptions {
    return (group: FormGroup): { [key: string]: string } | null => {
      const firstCtrl = group.controls[prop1];
      const secondCtrl = group.controls[prop2];
      const error = { misMatch: errorMsg };
      if (firstCtrl.value !== secondCtrl.value) {
        secondCtrl.setErrors({ ...secondCtrl.errors, ...error });
        return error;
      }
      return null;
    }
  }

}
