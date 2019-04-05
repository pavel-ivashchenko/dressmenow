
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, take, retry } from 'rxjs/operators';
import { PrivatBankCurrencyApiObj, GlobalCurrencyObject } from '@app/shared/interfaces';
import { CURRENCY_CONSTANTS } from '@app/shared/constants';


@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  private _currencyApi: string = CURRENCY_CONSTANTS.CURRENCY_API;
  private _riskSurcharge: number = CURRENCY_CONSTANTS.RISK_SURCHARGE;
  private _defaultCurrencyObj: GlobalCurrencyObject = {
    currency:  CURRENCY_CONSTANTS.DEFAULT_CURRENCY,
    currencyIndex: CURRENCY_CONSTANTS.DEFAULT_CURRENCY_INDEX
  }
  private _currencyObj$: BehaviorSubject<GlobalCurrencyObject> = new BehaviorSubject(this._defaultCurrencyObj);
  private _isCurrencySwitchAvailable: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private _currencies: {[key:string]:string} | null = null;
  

  constructor(private http: HttpClient) {
    this.http.get<PrivatBankCurrencyApiObj[]>(this._currencyApi)
      .pipe(
        retry(2),
        take(1),
        map((res: PrivatBankCurrencyApiObj[]) => {
          if (res) {
            this._isCurrencySwitchAvailable.next(true);
            return res.reduce((acc, currIdxObj) => {
              acc[currIdxObj.ccy] = this.calcCurrencyIdx(currIdxObj)
              return acc;
            }, {});
          };
          return null;
        })
      )
      .subscribe(res => {
        this._currencies = res
      });
  }

  private calcCurrencyIdx(currIdxObj: PrivatBankCurrencyApiObj): string {
    return `${ +currIdxObj.sale + (+currIdxObj.sale / 100) * this._riskSurcharge }`;
  }

  public setGlobalCurrency(newCurrencyVal: string) {
    if (!this._currencies || newCurrencyVal === this._defaultCurrencyObj.currency) {
      this._currencyObj$.next(this._defaultCurrencyObj);
    } else {
      this._currencyObj$.next({
        currency: newCurrencyVal,
        currencyIndex: +this._currencies[newCurrencyVal]
      });
    }
  }

  public getGlobalCurrencyObj(): Observable<GlobalCurrencyObject> {
    return this._currencyObj$.asObservable();
  }

  public isCurrencySwitchAvailable(): Observable<boolean> {
    return this._isCurrencySwitchAvailable.asObservable();
  }

}
