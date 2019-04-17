
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef
} from '@angular/core';
import { MatDialog } from '@angular/material';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Currency, GlobalCurrencyObject } from '@app/shared/interfaces';
import { currencyArr } from '@app/shared/models';
import { IsMobileService, IsShrinkedService, CurrencyService } from '@app/core/services';
import { cartDialogMockData } from './models';
import { CartModalComponent } from './modals/cart-modal/cart-modal.component';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, OnDestroy {

  private _componentDestroyed$: Subject<void> = new Subject();
  private _cartDialogMockData = cartDialogMockData;
  public isCurrencySwitchAvailable$: Observable<boolean>;
  public globalCurrencyObj: GlobalCurrencyObject;
  public currencyArr: Currency[] = currencyArr;
  public isHamburgerActive: boolean = false;
  public isTopAdHidden: boolean = false;
  public isMobileMode: boolean;

  constructor(
    private cdr: ChangeDetectorRef,
    private isMobileService: IsMobileService,
    private currencyService: CurrencyService,
    private dialog: MatDialog,
    public isShrinkedService: IsShrinkedService
  ) { }

  ngOnInit() {
    this.isMobileService.check()
      .pipe(
        takeUntil(this._componentDestroyed$)
      )
      .subscribe(res => {
        this.isMobileMode = res;
        if (this.isHamburgerActive && !this.isMobileMode) {
          this.isHamburgerActive = false;
          this.cdr.detectChanges();
        }
      });
    this.currencyService.getGlobalCurrencyObj()
      .pipe(
        takeUntil(this._componentDestroyed$)
      )
      .subscribe((res: GlobalCurrencyObject) => {
        this.globalCurrencyObj = res;
      });
    this.isCurrencySwitchAvailable$ = this.currencyService.isCurrencySwitchAvailable();
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(CartModalComponent, {
      width: '400px',
      data: {
        items: this._cartDialogMockData,
        currencyObj: this.globalCurrencyObj
      }
    });
    dialogRef.afterClosed().subscribe(result => { // TODO remove if not needed
      console.log('The dialog was closed');
    });
  }

  public onCurrencyChange(newCurrency: string):void {
    this.currencyService.setGlobalCurrency(newCurrency);
  }

  ngOnDestroy(): void {
    this._componentDestroyed$.next();
    this._componentDestroyed$.unsubscribe();
  }

}
