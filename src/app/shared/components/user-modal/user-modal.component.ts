
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

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
  })
  public sendPasswordForm = new FormGroup({
    email: new FormControl('')
  })
  public hidePassword = false;
  public views = {
    default: 'DEFAULT',
    sendPassword: 'SEND_PASSWORD',
    createAccount: 'CREATE_ACCOUNT',
    checkEmail: 'CHECK_EMAIL'
  };
  public currentView;

  constructor(private dialogRef: MatDialogRef<UserModalComponent>) { }

  ngOnInit() { }

  public onCloseModal(): void {
    this.dialogRef.close();
  }

  public togglePassword(event: MouseEvent): void {
    event.stopPropagation();
    this.hidePassword = !this.hidePassword;
  }

  public backToDefaultView(event: MouseEvent): void {
    event.stopPropagation();
    this.currentView = this.views.default;
  }
  
  public onSignIn(): void {
    console.log('sign in works');
  }

  public onSendPassword(): void {
    if (this.sendPasswordForm.valid) {
      this.currentView = this.views.checkEmail;
    }
  }

  public gotoCreateAccountForm(event: MouseEvent): void {
    event.stopPropagation();
    this.currentView = this.views.createAccount;
  }

}
