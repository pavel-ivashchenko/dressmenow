
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, take, retry } from 'rxjs/operators';

import { PrivatBankCurrencyApiObj, GlobalCurrency } from '@app/shared/interfaces';
import { CURRENCY_CONSTANTS } from '@app/shared/constants';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  private _currencyApi: string = CURRENCY_CONSTANTS.CURRENCY_API;
  private _riskSurcharge: number = CURRENCY_CONSTANTS.RISK_SURCHARGE;
  
  constructor(private http: HttpClient) {}

  private _getCurrencies(): Observable<{[key:string]:string} | null> {
    return this.http.get<PrivatBankCurrencyApiObj[]>(this._currencyApi)
      .pipe(
        retry(2),
        take(1),
        map((res: PrivatBankCurrencyApiObj[]) => {
          return !res ?
            null :
            res.reduce((acc, currIdxObj) => {
              acc[currIdxObj.ccy] = this._calcCurrencyIdx(currIdxObj)
              return acc;
            }, {});
        })
      )
  }

  private _calcCurrencyIdx(currIdxObj: PrivatBankCurrencyApiObj): string {
    return `${ +currIdxObj.sale + (+currIdxObj.sale / 100) * this._riskSurcharge }`;
  }

  private _getGlobalCurrency(newCurrencyVal: string): Observable<GlobalCurrency | null> {
    return this._getCurrencies()
      .pipe(
        map(currencies => currencies ? { name: newCurrencyVal, index: +currencies[newCurrencyVal] } : null)
      )
  }

  public setGlobalCurrency(newCurrencyVal: string): Observable<GlobalCurrency | null> {
    return this._getGlobalCurrency(newCurrencyVal);
  }

}
