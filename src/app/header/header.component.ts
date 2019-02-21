
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Currency } from './interfaces';
import { currencyArr } from './models';
import { ViewSizeService } from '@app/core/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

  public currencyArr: Currency[];
  public selectedCurrency: string = currencyArr[1].uiValue;
  public isHamburgerActive: boolean = false;
  public isMobileMenuHidden: boolean = false;
  public $currViewWidth: Observable<number>;
  public currViewWith: number;

  constructor(
    private viewSizeService: ViewSizeService
  ) { }

  ngOnInit() {
    this.currencyArr = currencyArr;
    this.$currViewWidth = this.viewSizeService.getCurrViewWidth();
    this.$currViewWidth.subscribe(viewWidth => {
      this.currViewWith = viewWidth;
    });
  }

  public onHamburgerClick(): void {
    this.isHamburgerActive = !this.isHamburgerActive;
    this.isMobileMenuHidden = !this.isMobileMenuHidden;
  }

}
