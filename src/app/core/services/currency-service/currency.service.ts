
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { map, take, catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

import { PrivatBankCurrencyApiObj, GlobalCurrency } from '@app/shared/interfaces';
import { MAT_SNACKBAR_CONSTANTS, CURRENCY_CONSTANTS } from '@app/shared/constants';

@Injectable({ providedIn: 'root' })
export class CurrencyService {

  private customGlobalCurrencies: { [key: string]: number } = {};
  private defaultGlobalCurrency: GlobalCurrency = {
    name: CURRENCY_CONSTANTS.DEFAULT_CURRENCY,
    index: CURRENCY_CONSTANTS.DEFAULT_CURRENCY_INDEX
  };

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) { }

  // PUBLIC METHODS

  public setGlobalCurrency(newCurrencyVal: string): Observable<GlobalCurrency> {
    switch (true) {
      case newCurrencyVal === CURRENCY_CONSTANTS.DEFAULT_CURRENCY: {
        return of(this.defaultGlobalCurrency);
      }
      case newCurrencyVal in this.customGlobalCurrencies: {
        return of({ name: newCurrencyVal, index: this.customGlobalCurrencies[newCurrencyVal] });
      }
      default: {
        return this.getGlobalCurrency(newCurrencyVal);
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
      case CURRENCY_CONSTANTS.DEFAULT_CURRENCY: {
        this.snackBar.open(
          CURRENCY_CONSTANTS.SNACKBAR_ALERTS.customCurrencyDeleted,
          MAT_SNACKBAR_CONSTANTS.MAT_SNACKBAR_OK_PHRASE,
          { duration: MAT_SNACKBAR_CONSTANTS.MAT_SNACKBAR_DURATION });
        return of(this.defaultGlobalCurrency);
      }
      case null: {
        delete this.customGlobalCurrencies[newCurrency.name];
        this.snackBar.open(
          CURRENCY_CONSTANTS.SNACKBAR_ALERTS.defaultCurrencyIdxChange,
          MAT_SNACKBAR_CONSTANTS.MAT_SNACKBAR_OK_PHRASE,
          { duration: MAT_SNACKBAR_CONSTANTS.MAT_SNACKBAR_DURATION });
        return of(this.defaultGlobalCurrency);
      }
      default: {
        this.customGlobalCurrencies[newCurrency.name] = newCurrency.index;
        return of(newCurrency);
      }
    }
  }

  // PRIVATE METHODS

  private getCurrencies(): Observable<{[key: string]: string} | null> {
    return this.http.get<PrivatBankCurrencyApiObj[]>(CURRENCY_CONSTANTS.CURRENCY_API)
      .pipe(
        take(1),
        catchError(_ => of(null)),
        map((res: PrivatBankCurrencyApiObj[] | null) => {
          return res ?
            res.reduce((acc, currIdxObj) => {
              acc[currIdxObj.ccy] = this.calcCurrencyIdx(currIdxObj);
              return acc;
            }, {}) : null;
        })
      );
  }

  private calcCurrencyIdx(currIdxObj: PrivatBankCurrencyApiObj): string {
    return `${ +currIdxObj.sale + (+currIdxObj.sale / 100) * CURRENCY_CONSTANTS.RISK_SURCHARGE }`;
  }

  private getGlobalCurrency(newCurrencyVal: string): Observable<GlobalCurrency | null> {
    return this.getCurrencies()
      .pipe(
        map((currencies: {[key: string]: string} | null) => {
          if (!currencies) {
            this.snackBar.open(
              CURRENCY_CONSTANTS.SNACKBAR_ALERTS.apiNoResponse,
              MAT_SNACKBAR_CONSTANTS.MAT_SNACKBAR_OK_PHRASE,
              { duration: MAT_SNACKBAR_CONSTANTS.MAT_SNACKBAR_DURATION });
            return null;
          }
          return { name: newCurrencyVal, index: +currencies[newCurrencyVal] };
        })
      );
  }

}
