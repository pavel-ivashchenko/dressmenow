
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PrivatBankCurrencyApiObj } from '@app/shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class SwitchCurrencyService {

  private _componentDestroyed: Subject<void> = new Subject();
  private currencyApi = 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5';
  private riskSurcharge = 10;
  private _currencyIndexes: PrivatBankCurrencyApiObj[];

  constructor(private http: HttpClient) {
    this.http.get<PrivatBankCurrencyApiObj[]>(this.currencyApi)
      .pipe(
        takeUntil(this._componentDestroyed)
      )
      .subscribe((res: PrivatBankCurrencyApiObj[])=> {
        debugger;
        this._currencyIndexes = res;
      });
  }

  public getCurrencyIdx(currency: string): number {
    debugger;
    const requestedCurrIdxObj = this._currencyIndexes.find(currIdxObj => currIdxObj.ccy === currency);
    return this.calcCurrencyIdx(requestedCurrIdxObj);
  }

  private calcCurrencyIdx(currIdxObj: PrivatBankCurrencyApiObj): number {
    return +currIdxObj.sale + (+currIdxObj.sale / 100) * this.riskSurcharge;
  }

  ngOnDestroy(): void {
    this._componentDestroyed.next();
    this._componentDestroyed.unsubscribe();
  }

}
