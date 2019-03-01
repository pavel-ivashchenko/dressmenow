
import { ChangeDetectionStrategy, Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Currency } from './interfaces';
import { currencyArr } from './models';
import { ViewSizeService } from '@app/core/services';
import { Observable, Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';
import { bootstrapGrid } from '@app/core/models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, OnDestroy {

  private $currViewWidth: Observable<number>;
  private componentDestroyed: Subject<void> = new Subject();
  private LG_BREAKPOINT = bootstrapGrid.large;
  public currencyArr: Currency[];
  public selectedCurrency: string = currencyArr[1].uiValue;
  public isHamburgerActive = false;
  public isTopAddHidden = false;
  public isMobileMode: boolean;

  constructor(
    private viewSizeService: ViewSizeService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.currencyArr = currencyArr;
    this.$currViewWidth = this.viewSizeService.getCurrViewWidth();
    this.$currViewWidth
      .pipe(
        takeUntil(this.componentDestroyed)
      )
      .subscribe(newWidth => {
        if (this.isMobileMode !== newWidth < this.LG_BREAKPOINT) {
          this.disableMobileMenu();
        } else {
          this.isMobileMode = true;
        }
      });
  }

  private disableMobileMenu(): void {
    this.isHamburgerActive = this.isMobileMode = false;
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    this.componentDestroyed.next();
    this.componentDestroyed.unsubscribe();
  }

}
