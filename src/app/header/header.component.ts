
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef
} from '@angular/core';
import { cartDialogMockData } from './models';
import { Currency } from '@app/shared/interfaces';
import { currencyArr } from '@app/shared/models';
import { IsMobileService, IsShrinkedService, SwitchCurrencyService } from '@app/core/services';
import { CartModalComponent } from './modals/cart-modal/cart-modal.component';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, OnDestroy {

  private _componentDestroyed$: Subject<void> = new Subject();
  private _selectedCurrency: string = currencyArr[0].uiValue;
  public currencyArr: Currency[] = currencyArr;
  public isHamburgerActive: boolean = false;
  public isTopAddHidden: boolean = false;
  public isMobileMode: boolean;
  public cartDialogMockData = cartDialogMockData;
  public currencyIdx$: Observable<number>;
  public set selectedCurrency(value: string) {
    this._selectedCurrency = value;
    this.currencyIdx$ = this.switchCurrencyService.getCurrencyIdx(value);
  }
  public get selectedCurrency(): string {
    return this._selectedCurrency;
  }

  constructor(
    private cdr: ChangeDetectorRef,
    private isMobileService: IsMobileService,
    private switchCurrencyService: SwitchCurrencyService,
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
    this.currencyIdx$ = this.switchCurrencyService.getCurrencyIdx(this.selectedCurrency);
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(CartModalComponent, {
      width: '400px',
      data: {
        items: this.cartDialogMockData,
        currencyIdx: this.currencyIdx$
      }
    });

    dialogRef.afterClosed().subscribe(result => { // TODO remove if not needed
      console.log('The dialog was closed');
    });

  }

  ngOnDestroy(): void {
    this._componentDestroyed$.next();
    this._componentDestroyed$.unsubscribe();
  }

}
