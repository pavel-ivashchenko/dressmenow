
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  OnDestroy,
  HostListener,
  ChangeDetectorRef
} from '@angular/core';
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

  private currViewWidth$: Observable<number>;
  private _componentDestroyed: Subject<void> = new Subject();
  private LG_BREAKPOINT = bootstrapGrid.large;
  public currencyArr: Currency[] = currencyArr;
  public selectedCurrency: string = currencyArr[1].uiValue;
  public isHamburgerActive: boolean = false;
  public isTopAddHidden: boolean = false;
  public isShrinkedHeader: boolean = false;
  public isMobileMode: boolean;

  @HostListener("window:scroll")
  onScroll() {
    this.isShrinkedHeader = window.scrollY >= 100 ? true : false;
  }

  constructor(
    private viewSizeService: ViewSizeService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.currViewWidth$ = this.viewSizeService.getCurrViewWidth();
    this.currViewWidth$
      .pipe(
        takeUntil(this._componentDestroyed)
      )
      .subscribe(newWidth => {
        if (this.isHamburgerActive && newWidth >= this.LG_BREAKPOINT) {
          this.isHamburgerActive = false;
          this.cdr.detectChanges();
        }
        if (this.isMobileMode && newWidth >= this.LG_BREAKPOINT) {
          this.isMobileMode = false;
          this.cdr.detectChanges();
        }
        if (!this.isMobileMode && newWidth < this.LG_BREAKPOINT) {
          this.isMobileMode = true;
          this.cdr.detectChanges();
        }
      });
  }

  ngOnDestroy(): void {
    this._componentDestroyed.next();
    this._componentDestroyed.unsubscribe();
  }

}
