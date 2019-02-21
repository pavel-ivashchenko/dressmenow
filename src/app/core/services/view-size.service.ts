
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable,  } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Injectable()
export class ViewSizeService {

  private $currViewWidth: BehaviorSubject<number>;

  constructor() {
    this.$currViewWidth = new BehaviorSubject(window.innerWidth);
    window.addEventListener('resize', this._resizeHandler.bind(this));
  }

  private _resizeHandler(event: any) {
    this.$currViewWidth.next(event.currentTarget.innerWidth);
  };

  public getCurrViewWidth(): Observable<number> {
    return this.$currViewWidth.asObservable().pipe(
      debounceTime(300),
      distinctUntilChanged()
    );
  }

}
