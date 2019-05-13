
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, take, retry, catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

import { PrivatBankCurrencyApiObj, GlobalCurrency } from '@app/shared/interfaces';
import { MAT_SNACKBAR_CONSTANTS, CURRENCY_CONSTANTS } from '@app/shared/constants';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  private _currencyApi: string = CURRENCY_CONSTANTS.CURRENCY_API;
  private _riskSurcharge: number = CURRENCY_CONSTANTS.RISK_SURCHARGE;
  private _defaultCurrency: string = CURRENCY_CONSTANTS.DEFAULT_CURRENCY;
  private _snackBarDuration: number = MAT_SNACKBAR_CONSTANTS.MAT_SNACKBAR_DURATION;
  private _snackBarOkPhrase: string = MAT_SNACKBAR_CONSTANTS.MAT_SNACKBAR_OK_PHRASE;
  private _snackBarAlertsText: { [key: string]: string } = CURRENCY_CONSTANTS.SNACKBAR_ALERTS;
  private _customGlobalCurrencies: { [key: string]: number } = {};
  private _defaultGlobalCurrency: GlobalCurrency = {
    name: CURRENCY_CONSTANTS.DEFAULT_CURRENCY,
    index: CURRENCY_CONSTANTS.DEFAULT_CURRENCY_INDEX
  };

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {}

  private _getCurrencies(): Observable<{[key: string]: string} | null> {
    return this.http.get<PrivatBankCurrencyApiObj[]>(this._currencyApi)
      .pipe(
        retry(2),
        take(1),
        catchError(_ => of(null)),
        map((res: PrivatBankCurrencyApiObj[] | null) => {
          return res ?
            res.reduce((acc, currIdxObj) => {
              acc[currIdxObj.ccy] = this._calcCurrencyIdx(currIdxObj);
              return acc;
            }, {}) :
            null;
        })
      );
  }

  private _calcCurrencyIdx(currIdxObj: PrivatBankCurrencyApiObj): string {
    return `${ +currIdxObj.sale + (+currIdxObj.sale / 100) * this._riskSurcharge }`;
  }

  private _getGlobalCurrency(newCurrencyVal: string): Observable<GlobalCurrency | null> {
    return this._getCurrencies()
      .pipe(
        map((currencies: {[key: string]: string} | null) => {
          if (!currencies) {
            this.snackBar.open(
              this._snackBarAlertsText.apiNoResponse,
              this._snackBarOkPhrase,
              { duration: this._snackBarDuration });
            return null;
          }
          return { name: newCurrencyVal, index: +currencies[newCurrencyVal] };
        })
      );
  }

  public setGlobalCurrency(newCurrencyVal: string): Observable<GlobalCurrency> {
    switch (true) {
      case newCurrencyVal === this._defaultCurrency: {
        return of(this._defaultGlobalCurrency);
      }
      case newCurrencyVal in this._customGlobalCurrencies: {
        return of({ name: newCurrencyVal, index: this._customGlobalCurrencies[newCurrencyVal] });
      }
      default: {
        return this._getGlobalCurrency(newCurrencyVal);
      }
    }
  }

  // TODO test after admin functionality implemented

  /**
  * Adds new custom setting for a particular currency's index,
  * after that when a user selects a new currency it get selected among the ones
  * a user has previously added; it can be deleted by sending null as the value
  */
  public setCustomGlobalCurrency(newCurrency: GlobalCurrency): Observable<GlobalCurrency> {
    switch (newCurrency.name) {
      case this._defaultCurrency: {
        this.snackBar.open(
          this._snackBarAlertsText.customCurrencyDeleted,
          this._snackBarOkPhrase,
          { duration: this._snackBarDuration });
        return of(this._defaultGlobalCurrency);
      }
      case null: {
        delete this._customGlobalCurrencies[newCurrency.name];
        this.snackBar.open(
          this._snackBarAlertsText.defaultCurrencyIdxChange,
          this._snackBarOkPhrase,
          { duration: this._snackBarDuration });
        return of(this._defaultGlobalCurrency);
      }
      default: {
        this._customGlobalCurrencies[newCurrency.name] = newCurrency.index;
        return of(newCurrency);
      }
    }
  }

}
