
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { Subject, Observable } from 'rxjs';
import { tap, scan, map, shareReplay, startWith, distinctUntilChanged, first } from 'rxjs/operators';

import { AuthenticationService } from '@app/core/services';
import { preventDefault$, stopEvent } from '@app/shared/helpers';
import { User } from '@app/shared/interfaces';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserModalComponent implements OnInit {

  private preventDefault$ = preventDefault$;
  private afterLoginURL = '/user'; // TODO change to appropriate name

  public signInForm = new FormGroup({
    login: new FormControl(''),
    password: new FormControl('')
  });
  public remindPasswordForm = new FormGroup({
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
  public views: { [key: string]: string } = {
    default: 'DEFAULT',
    remindPassword: 'REMIND_PASSWORD',
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
  public regSteps: string[] = ['email', 'name', 'password'];
  public currRegIdx = 0;
  public passwordErrors$: Observable<{ [ key: string ]: string }> =
    this.createAccountForm.controls.createPassword.statusChanges
      .pipe(
        startWith(''),
        map(_ => this.createAccountForm.controls.createPassword.errors || {}),
        shareReplay(1)
      );

  constructor(
    private dialogRef: MatDialogRef<UserModalComponent>,
    private authenticationService: AuthenticationService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() { }

  public onCloseModal(): void {
    this.dialogRef.close();
  }

  public onSignIn(): void {
    if (this.signInForm.invalid) { return; }
    this.authenticationService.login(this.signInForm.value.login, this.signInForm.value.password)
      .pipe(first())
      .subscribe(
        (res: User | null) => { res ? this.router.navigate([ this.afterLoginURL ]) : null; }
      );
  }

  public onRemindPassword(event: MouseEvent): void {
    if (this.remindPasswordForm.invalid) { return; }
    this.authenticationService.remindPassword(this.remindPasswordForm.value.email)
      .pipe(first())
      .subscribe(
        (res: boolean) => {
          res ?
            this.currView$.next([this.views.checkEmail, event]) :
              this.currView$.next([this.views.notExists, event]);
        }
      );
  }

  public onCreateAccount(event: MouseEvent): void {
    console.log('create account works');
    stopEvent(event);
    this.currView$.next([this.views.afterCreate]);
  }

  public gotoRegStep(event: MouseEvent, stepIdx: number): void {
    stopEvent(event);
    const currForm = this.createAccountForm.controls[ this.regSteps[this.currRegIdx] ];
    if (((this.currRegIdx - stepIdx < 0) && currForm.valid) || this.currRegIdx - stepIdx > 0) {
      this.currRegIdx = stepIdx;
      this.cdr.detectChanges();
    }
  }

  public checkEmail(event: MouseEvent): void {
    stopEvent(event);
    if (this.createAccountForm.controls.email.invalid) { return; }
    this.authenticationService.checkLogin(this.createAccountForm.value.email.email_1)
      .pipe(first())
      .subscribe(
        (res: boolean) =>
          res ?
            this.currView$.next([this.views.alreadyExists]) :
              this.gotoRegStep(event, 1)
      );
  }

}
