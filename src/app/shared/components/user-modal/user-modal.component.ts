
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { Subject, Observable } from 'rxjs';
import { tap, scan, map, shareReplay, startWith } from 'rxjs/operators';

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
      sendnews: new FormControl('true')
    }),
    name: new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl('')
    }),
    createPassword: new FormControl('')
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

  public regSteps = ['email', 'name', 'password'];
  public currRegIdx: number = 0;

  public createPasswordErrors$: Observable<{ [ key: string ]: string }> = 
    this.createAccountForm.controls.createPassword.statusChanges
      .pipe(
        startWith(''),
        map(_ => this.createAccountForm.controls.createPassword.errors || {}),
        shareReplay(1)
      )

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

  public onCreateAccount(event: MouseEvent): void {
    console.log('create account works');
    this.stopEvent(event);
  }

  public gotoRegStep(event: MouseEvent, stepIdx: number): void {
    this.stopEvent(event);
    const currForm = this.createAccountForm.controls[this.regSteps[this.currRegIdx]];
    ((this.currRegIdx - stepIdx < 0) && currForm.valid) || this.currRegIdx - stepIdx > 0 ?
      this.currRegIdx = stepIdx : null;
  }

  private stopEvent(event: any): void {
    event.stopPropagation(); event.preventDefault();
  }

}
