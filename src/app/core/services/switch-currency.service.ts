
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class SwitchCurrencyService {

  private currIndex$: BehaviorSubject<number>;

  constructor(private http: HttpClient) {
    debugger;
    console.log(environment);
  }

  public getCurrencyIdx(currency: string) {
    //https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5
  }

}
