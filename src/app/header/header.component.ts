
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef
} from '@angular/core';
import { Currency } from './interfaces';
import { currencyArr } from './models';
import { IsMobileService, IsShrinkedService } from '@app/core/services';
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
  public currencyArr: Currency[] = currencyArr;
  public selectedCurrency: string = currencyArr[1].uiValue;
  public isHamburgerActive: boolean = false;
  public isTopAddHidden: boolean = false;
  public isMobileMode: boolean;
  public cartDialogMockData = [
    {
      img: '../../../../assets/img/test.jpg',
      name: 'Some Cart Item Test Name Is Here',
      qty: 1,
      currency: 'USD',
      price: 1900
    },
    {
      img: '../../../../assets/img/test.jpg',
      name: 'Some Cart Item Test Name Is Here',
      qty: 2,
      currency: 'USD',
      price: 2000
    },
    {
      img: '../../../../assets/img/test.jpg',
      name: 'Some Cart Item Test Name Is Here',
      qty: 3,
      currency: 'USD',
      price: 2100
    },
    {
      img: '../../../../assets/img/test.jpg',
      name: 'Some Cart Item Test Name Is Here',
      qty: 4,
      currency: 'USD',
      price: 2200
    },
    {
      img: '../../../../assets/img/test.jpg',
      name: 'Some Cart Item Test Name Is Here',
      qty: 5,
      currency: 'USD',
      price: 2300
    }
  ];

  constructor(
    private cdr: ChangeDetectorRef,
    private isMobileService: IsMobileService,
    public isShrinkedService: IsShrinkedService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
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
