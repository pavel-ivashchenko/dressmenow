
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { Subject, Observable } from 'rxjs';
import { tap, scan, map, shareReplay, startWith, distinctUntilChanged } from 'rxjs/operators';

import { preventDefault$, stopEvent } from '@app/shared/helpers';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserModalComponent implements OnInit {

  private preventDefault$ = preventDefault$;

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
      sendnews: new FormControl('true')
    }),
    name: new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl('')
    }),
    createPassword: new FormControl('')
  });

  public hidePassword$: Observable<any> = new Subject().pipe(
    distinctUntilChanged(),
    scan((acc) => acc = !acc, false)
  );

  public views = {
    default: 'DEFAULT',
    sendPassword: 'SEND_PASSWORD',
    createAccount: 'CREATE_ACCOUNT',
    checkEmail: 'CHECK_EMAIL',
    alreadyExists: 'ALREADY_EXISTS',
    notExists: 'NOT_EXISTS',
    afterCreate: 'AFTER_CREATE'
  };

  public currView$: any = new Subject()
    .pipe(
      distinctUntilChanged(),
      this.preventDefault$,
      scan((acc, viewName) => acc = viewName, this.views.default),
      shareReplay()
    );

  public regSteps = ['email', 'name', 'password'];
  public currRegIdx = 0;

  public passwordErrors$: Observable<{ [ key: string ]: string }> =
    this.createAccountForm.controls.createPassword.statusChanges
      .pipe(
        startWith(''),
        map(_ => this.createAccountForm.controls.createPassword.errors || {}),
        shareReplay(1)
      );

  constructor(private dialogRef: MatDialogRef<UserModalComponent>) { }

  ngOnInit() { }

  public onCloseModal(): void {
    this.dialogRef.close();
  }

  public onSignIn(): void {
    console.log('sign in works');
  }

  public onSendPassword(event: MouseEvent): void {
    // here will be a request to the server
    this.sendPasswordForm.valid ? true : null;
    false ?
      this.currView$.next([this.views.checkEmail, event]) :
      this.currView$.next([this.views.notExists, event]);
    this.sendPasswordForm.reset();
  }

  public onCreateAccount(event: MouseEvent): void {
    console.log('create account works');
    stopEvent(event);
    this.currView$.next([this.views.afterCreate]);
  }

  public gotoRegStep(event: MouseEvent, stepIdx: number): void {
    stopEvent(event);
    const currForm = this.createAccountForm.controls[this.regSteps[this.currRegIdx]];
    ((this.currRegIdx - stepIdx < 0) && currForm.valid) || this.currRegIdx - stepIdx > 0 ?
      this.currRegIdx = stepIdx : null;
  }

  public checkEmail(event: MouseEvent): void {
    // here will be a request to the server
    true ?
      this.gotoRegStep(event, 1) :
      this.currView$.next([this.views.alreadyExists, event]);
  }

}
