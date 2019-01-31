
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Currency } from './interfaces';
import { currencyArr } from './models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

  public currencyArr: Currency[];
  public selectedCurrency: string = currencyArr[1].uiValue;

  constructor() { }

  ngOnInit() {
    debugger;
    this.currencyArr = currencyArr;
    console.log(this.selectedCurrency);
  }

}
