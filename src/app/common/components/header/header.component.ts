
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
import { CartModalComponent } from './modals/cart-modal/cart-modal.component';

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

  private _componentDestroyed$: Subject<void> = new Subject();
  public isHamburgerActive: boolean = false;
  public isTopAdHidden: boolean = false;
  public isMobileMode: boolean;
  public currencyArr: Currency[] = currencyArr;
  public currency$: Observable<GlobalCurrency> = this._store.select(state => state.currency);

  constructor(
    private _store: Store<IAppState>,
    private _dialog: MatDialog,
    public isShrinkedService: IsShrinkedService,
  ) { }

  ngOnInit() {}

  public openDialog(): void {
    this._dialog.open(CartModalComponent, {
      width: '400px',
      data: {}
    });
  }

  public onCurrencyChange(newCurrency: string):void {
    this._store.dispatch(new SetCurrency(newCurrency));
  }

  ngOnDestroy(): void {
    this._componentDestroyed$.next();
    this._componentDestroyed$.unsubscribe();
  }

}
