
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, AbstractControl, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
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

  public signInForm: FormGroup;
  public remindPasswordForm: FormGroup;
  public createAccountForm: FormGroup;

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
  public hidePassword = true;
  public currUser: User;
  public isEmailExists$: Subject<boolean> = new Subject();

  constructor(
    private dialogRef: MatDialogRef<UserModalComponent>,
    private authenticationService: AuthenticationService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.createAccountForm = this.getCreateAccountForm();
    this.signInForm = this.fb.group({ login: '', password: '' });
    this.remindPasswordForm = this.fb.group({ email: '' });
  }

  // PUBLIC METHODS

  public onCloseModal(): void { this.dialogRef.close(); }

  public onSignIn(): void {
    if (this.signInForm.invalid) { return; }
    this.authenticationService.login(this.signInForm.value.login, this.signInForm.value.password)
      .pipe(first())
      .subscribe( (res: User | null) => { if (res) { this.router.navigate([ this.afterLoginURL ]); } } );
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
    stopEvent(event);
    if (this.createAccountForm.invalid) { return; }
    const newUser = {
      ...this.createAccountForm.value.name,
      email: this.createAccountForm.value.email.email_1,
      sendNews: this.createAccountForm.value.email.sendNews,
      password: this.createAccountForm.value.password
    };
    this.authenticationService.createAccount(newUser)
      .subscribe((res: User | null) => {
        if (res) {
          this.currView$.next([this.views.afterCreate]);
          this.createAccountForm.reset();
          this.createAccountForm.controls.sendNews.setValue(true);
          this.currUser = res;
        }
      });
  }

  public backToDefaultView(event: Event, form: FormGroup): void {
    form.reset();
    this.currView$.next([this.views.default, event]);
  }

  public onCheckIfEmailExists(): void {
    this.authenticationService.checkLogin(this.createAccountForm.value.email.email_1)
      .pipe(first())
      .subscribe(res => this.isEmailExists$.next(res));
  }

  public onChangeCurrView(value) {
    this.currView$.next(value);
  }

  // PRIVATE METHODS

  private getCreateAccountForm(): FormGroup {
    return this.fb.group({
      email: this.fb.group({
        email_1: '',
        email_2: ''
      }),
      name: this.fb.group({
        firstName: '',
        lastName: ''
      }),
      sendNews: 'true',
      password: ''
    });
  }

}
