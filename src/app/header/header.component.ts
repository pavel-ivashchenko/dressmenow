
import { ChangeDetectionStrategy, Component, OnInit, OnDestroy, HostListener, ChangeDetectorRef } from '@angular/core';
import { Currency } from './interfaces';
import { currencyArr } from './models';
import { ViewSizeService } from '@app/core/services';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { bootstrapGrid } from '@app/core/models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, OnDestroy {

  private $currViewWidth: Observable<number>;
  private _componentDestroyed: Subject<void> = new Subject();
  private LG_BREAKPOINT = bootstrapGrid.large;
  public currencyArr: Currency[];
  public selectedCurrency: string = currencyArr[1].uiValue;
  public isHamburgerActive = false;
  public isTopAddHidden = false;
  public isShrinkedHeader = false;

  @HostListener("window:scroll")
  onScroll() {
    this.isShrinkedHeader = window.scrollY >= 156 ? true : false;
  }

  constructor(
    private viewSizeService: ViewSizeService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.currencyArr = currencyArr;
    this.$currViewWidth = this.viewSizeService.getCurrViewWidth();
    this.$currViewWidth
      .pipe(
        takeUntil(this._componentDestroyed)
      )
      .subscribe(newWidth => {
        if (newWidth >= this.LG_BREAKPOINT) {
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
