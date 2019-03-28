
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { PrivatBankCurrencyApiObj, Currency } from '@app/shared/interfaces';
import { currencyArr } from '@app/shared/models';

@Injectable({
  providedIn: 'root'
})
export class SwitchCurrencyService {

  private currencyApi = 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5';
  private riskSurcharge = 10;
  private currencyArr = currencyArr;
  private currency: string = this.currencyArr[0].uiValue;
  private defaultCurrencyIdx = 1;
  public currencyIdx$ = new BehaviorSubject<number>(this.defaultCurrencyIdx);

  constructor(private http: HttpClient) { }

  public getCurrencyIdx(): Observable<number> {
    return this.currencyIdx$.asObservable();
  }

  public setCurrency(value: string): void {
    debugger;
    this.currency = value;
    if (this.currency === this.currencyArr[0].uiValue) {
      this.currencyIdx$.next(this.defaultCurrencyIdx);
    } else {
      this.http.get<PrivatBankCurrencyApiObj[]>(this.currencyApi)
        .pipe(
          map((res: PrivatBankCurrencyApiObj[]) => {
            debugger;
            const requestedCurrIdxObj = res.find(currIdxObj => currIdxObj.ccy === this.currency);
            this.currencyIdx$.next(this.calcCurrencyIdx(requestedCurrIdxObj));
          })
        )
    }
  }

  private calcCurrencyIdx(currIdxObj: PrivatBankCurrencyApiObj): number {
    return +currIdxObj.sale + (+currIdxObj.sale / 100) * this.riskSurcharge;
  }

}
