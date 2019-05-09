
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
  private _currencies: {[key:string]:string} | null = null;
  
  constructor(private http: HttpClient) {
    this._getGlobalCurrency();
  }

  private _getGlobalCurrency(newCurrencyVal: string = ''): Observable<GlobalCurrency | null> {
    return this.http.get<PrivatBankCurrencyApiObj[]>(this._currencyApi)
      .pipe(
        retry(2),
        take(1),
        map((res: PrivatBankCurrencyApiObj[]) => {
          if (!res) {
            return null;
          }
          this._currencies = res.reduce((acc, currIdxObj) => {
            acc[currIdxObj.ccy] = this._calcCurrencyIdx(currIdxObj)
            return acc;
          }, {});
          return newCurrencyVal ?
            { name: newCurrencyVal, index: +this._currencies[newCurrencyVal] } :
            null;
        })
      )
  }

  private _calcCurrencyIdx(currIdxObj: PrivatBankCurrencyApiObj): string {
    return `${ +currIdxObj.sale + (+currIdxObj.sale / 100) * this._riskSurcharge }`;
  }

  public setGlobalCurrency(newCurrencyVal: string): Observable<GlobalCurrency> {
    return this._currencies ?
      of({ name: newCurrencyVal, index: +this._currencies[newCurrencyVal] }) :
      this._getGlobalCurrency(newCurrencyVal);
  }

}
