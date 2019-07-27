
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import { MatDialog } from '@angular/material';
import { Subject, Observable } from 'rxjs';

import { Currency, GlobalCurrency } from '@app/shared/interfaces';
import { currencyArr } from '@app/shared/models';
import { IsShrinkedService } from '@app/core/services';
import { CartModalComponent } from '@app/shared/components/cart-modal/cart-modal.component';
import { UserModalComponent } from '@app/shared/components/user-modal/user-modal.component';

import { Store } from '@ngrx/store';
import { SetCurrency } from '@app/core/store/actions';
import { IAppState } from '@app/core/store/state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, OnDestroy {

  private componentDestroyed$: Subject<void> = new Subject();
  public isHamburgerActive = false;
  public isTopAdHidden = false;
  public isMobileMode: boolean;
  public currencyArr: Currency[] = currencyArr;
  public currency$: Observable<GlobalCurrency> = this.store.select(state => state.currency);

  constructor(
    private store: Store<IAppState>,
    private dialog: MatDialog,
    public isShrinkedService: IsShrinkedService,
  ) { }

  ngOnInit() {}

  public onUserClick(): void {
    this.dialog.open(UserModalComponent), {
      width: '400px',
      data: {},
      autoFocus: false
    }
  }

  public onCartClick(): void {
    this.dialog.open(CartModalComponent, {
      width: '400px',
      data: {}
    });
  }

  public onCurrencyChange(newCurrency: string):void {
    this.store.dispatch(new SetCurrency(newCurrency));
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.unsubscribe();
  }

}
