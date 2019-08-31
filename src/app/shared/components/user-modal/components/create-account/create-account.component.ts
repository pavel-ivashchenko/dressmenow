
import { Component, OnInit, ChangeDetectionStrategy, Input, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { first, startWith, map, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { stopEvent } from '@app/shared/helpers';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateAccountComponent implements OnInit {

  @Input() createAccountForm: FormGroup;
  @Input() views: { [key: string]: string };
  @Input() currView: string;
  @Input() isEmailExists$: Observable<boolean>;

  @Output() resetCreateAccountForm: EventEmitter<any> = new EventEmitter();
  @Output() checkIfEmailExists: EventEmitter<string> = new EventEmitter();
  @Output() changeCurrView: EventEmitter<(string | MouseEvent)[]> = new EventEmitter();
  @Output() createAccount: EventEmitter<any> = new EventEmitter();

  public regSteps: string[] = ['email', 'name', 'password'];
  public currRegIdx = 0;
  public hidePassword = true;
  public passwordErrors$: Observable<{ [ key: string ]: string }>;

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.passwordErrors$ = this.createAccountForm.controls.password.statusChanges
      .pipe(
        startWith(''),
        map(_ => this.createAccountForm.controls.password.errors || {}),
        shareReplay(1)
      );
  }

  public gotoRegStep(event: MouseEvent, stepIdx: number): void {
    stopEvent(event);
    const currForm = this.createAccountForm.controls[ this.regSteps[this.currRegIdx] ];
    currForm.valid && this.currRegIdx === 0 ?
      this.checkEmail(stepIdx) : ((this.currRegIdx - stepIdx < 0) && currForm.valid) || this.currRegIdx - stepIdx > 0 ?
        this.onChangeCurrRegIdx(stepIdx) : null;
  }

  private checkEmail(stepIdx: number): void {
    this.checkIfEmailExists.emit(this.createAccountForm.value.email.email_1);
    this.isEmailExists$
      .pipe(first())
      .subscribe(
        (res: boolean) => {
          res ?
            this.onChangeCurrView([this.views.createAccount]) :
              this.onChangeCurrRegIdx(stepIdx);
        }
      );
  }

  public onChangeCurrView(value: (string | MouseEvent)[]) {
    this.changeCurrView.emit(value);
  }

  public onReset() {
    this.resetCreateAccountForm.emit();
  }

  public onCreate(event: MouseEvent) {
    this.createAccount.emit(event);
  }

  private onChangeCurrRegIdx(stepIdx: number): void {
    this.currRegIdx = stepIdx;
    this.cdr.detectChanges();
  }

}
