
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PrivatBankCurrencyApiObj, Currency } from '@app/shared/interfaces';
import { currencyArr } from '@app/shared/models';
import { CURRENCY_CONSTANTS } from '@app/shared/constants';

@Injectable({
  providedIn: 'root'
})
export class SwitchCurrencyService {

  private currencyApi: string = CURRENCY_CONSTANTS.CURRENCY_API;
  private riskSurcharge: number = CURRENCY_CONSTANTS.RISK_SURCHARGE;
  private defaultCurrencyIdx: number = CURRENCY_CONSTANTS.DEFAULT_CURRENCY_INDEX;
  private currencyArr: Currency[] = currencyArr;
  public currencyIdx$: Observable<number>;

  constructor(private http: HttpClient) { }

  public getCurrencyIdx(newCurrencyVal: string): Observable<number> {
    switch(newCurrencyVal) {
      case this.currencyArr[0].uiValue:
        this.currencyIdx$ = of(this.defaultCurrencyIdx);
        break;
      default:
        this.currencyIdx$ = this.http.get<PrivatBankCurrencyApiObj[]>(this.currencyApi)
          .pipe(
            map((res: PrivatBankCurrencyApiObj[]) => {
              const requestedCurrIdxObj = res.find(currIdxObj => currIdxObj.ccy === newCurrencyVal);
              return this.calcCurrencyIdx(requestedCurrIdxObj);
            })
          )
    }
    return this.currencyIdx$;
  }

  private calcCurrencyIdx(currIdxObj: PrivatBankCurrencyApiObj): number {
    return +currIdxObj.sale + (+currIdxObj.sale / 100) * this.riskSurcharge;
  }

}
