
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SwitchCurrencyService {

  private currIndex$: BehaviorSubject<number>;
  private currencyApi = 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5';

  constructor(private http: HttpClient) { }

  public getCurrencyIdx(currency: string): Observable<any> { // TODO interface
    return this.http.get(this.currencyApi);
  }

}
