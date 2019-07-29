
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
  
  public loginForm = new FormGroup({
    login: new FormControl(''),
    password: new FormControl('')
  })

  public hidePassword = false;

  constructor(private dialogRef: MatDialogRef<UserModalComponent>) { }

  ngOnInit() { }

  public dismissModal(): void {
    this.dialogRef.close();
  }

  public togglePassword(event: MouseEvent): void {
    event.stopPropagation();
    this.hidePassword = !this.hidePassword;
  }

  public getEmailErrorMsg(): string {
    return this.loginForm.controls.login.hasError('required') ? 'Будь ласка, введіть email' :
      this.loginForm.controls.login.hasError('email') ? 'Будь ласка, введіть корректний email' :
        '';
  }
  
  public onSubmit(): void {
    console.log('works');
  }

}
