
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { Subject } from 'rxjs';
import { scan, shareReplay, distinctUntilChanged, first } from 'rxjs/operators';

import { AuthenticationService } from '@app/core/services';
import { preventDefault$, stopEvent } from '@app/shared/helpers';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserModalComponent implements OnInit {

  private preventDefault$ = preventDefault$;
  private afterLoginURL = '/no user page yet';

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
    afterCreate: 'AFTER_CREATE',
    failLogin: 'FAIL_LOGIN',
    failRegister: 'FAIL_REGISTER'
  };
  public currView$: any = new Subject()
    .pipe(
      distinctUntilChanged(),
      this.preventDefault$,
      scan((acc, viewName) => acc = viewName, this.views.default),
      shareReplay(1)
    );
  public hidePassword = true;
  public registrationEmail: string;
  public isUserExists$: Subject<boolean> = new Subject();
  public isLoading = false;

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

  public onCloseModal(): void { this.dialogRef.close(); }

  public onSignIn(): void {
    if (this.signInForm.invalid) { return; }
    this.isLoading = true;
    this.authenticationService.login(this.signInForm.value.login, this.signInForm.value.password)
      .pipe(first())
      .subscribe((res: boolean) => {
        this.isLoading = false;
        res ?
          this.router.navigate([ this.afterLoginURL ]) :
            this.onChangeCurrView(this.views.failLogin);
      });
  }

  public onRemindPassword(event: MouseEvent): void {
    if (this.remindPasswordForm.invalid) { return; }
    this.authenticationService.remindPassword(this.remindPasswordForm.value.email)
      .pipe(first())
      .subscribe(
        (res: boolean) => {
          res ?
            this.onChangeCurrView(this.views.checkEmail, event) :
              this.onChangeCurrView(this.views.notExists, event);
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
    this.authenticationService.register(newUser)
      .subscribe((res: boolean) => {
        if (res) {
          this.onChangeCurrView(this.views.afterCreate);
          this.createAccountForm.reset();
          this.createAccountForm.controls.sendNews.setValue(true);
          this.registrationEmail = newUser.email;
        } else {
          this.onChangeCurrView(this.views.failRegister);
        }
      });
  }

  public backToDefaultView(form: FormGroup, event: Event | null = null): void {
    form.reset();
    this.onChangeCurrView(this.views.default, event);
  }

  public onCheckIfUserExists(): void {
    this.authenticationService.checkIfUserExists(this.createAccountForm.value.email.email_1)
      .pipe(first())
      .subscribe(res => this.isUserExists$.next(res));
  }

  public onChangeCurrView(viewName: string, event: Event | any = null): void {
    this.currView$.next([ viewName, event ]);
  }

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
