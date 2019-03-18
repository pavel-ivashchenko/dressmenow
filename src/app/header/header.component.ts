
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
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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

  constructor(
    private cdr: ChangeDetectorRef,
    private isMobileService: IsMobileService,
    public isShrinkedService: IsShrinkedService
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

  ngOnDestroy(): void {
    this._componentDestroyed.next();
    this._componentDestroyed.unsubscribe();
  }

}
