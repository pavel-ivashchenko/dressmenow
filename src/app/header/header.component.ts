
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef
} from '@angular/core';
import { Currency } from './interfaces';
import { currencyArr, cartDialogMockData } from './models';
import { IsMobileService, IsShrinkedService, SwitchCurrencyService } from '@app/core/services';
import { CartModalComponent } from './modals/cart-modal/cart-modal.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, OnDestroy {

  private _componentDestroyed: Subject<void> = new Subject();
  private _currencyIdx: number;
  public currencyArr: Currency[] = currencyArr;
  public selectedCurrency: string = currencyArr[1].uiValue;
  public isHamburgerActive: boolean = false;
  public isTopAddHidden: boolean = false;
  public isMobileMode: boolean;
  public cartDialogMockData = cartDialogMockData;

  constructor(
    private cdr: ChangeDetectorRef,
    private isMobileService: IsMobileService,
    public isShrinkedService: IsShrinkedService,
    private switchCurrencyService: SwitchCurrencyService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {

    this._currencyIdx = this.switchCurrencyService.getCurrencyIdx('USD');
    debugger;
    
    this.isMobileService.check()
      .pipe(
        takeUntil(this._componentDestroyed)
      )
      .subscribe(res => {
        this.isMobileMode = res;
        if (this.isHamburgerActive && !this.isMobileMode) {
          this.isHamburgerActive = false;
          this.cdr.detectChanges();
        }
      });
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(CartModalComponent, {
      width: '400px',
      data: this.cartDialogMockData
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  ngOnDestroy(): void {
    this._componentDestroyed.next();
    this._componentDestroyed.unsubscribe();
  }

}
