
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable,  } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IsShrinkedService {

  private $currScroll: BehaviorSubject<number>;
  private IS_SHRINKED: number = 200;

  constructor() {
    this.$currScroll = new BehaviorSubject(window.scrollY);
    window.addEventListener('scroll', this._scrollHandler.bind(this));
  }

  private _scrollHandler(event: any) {
    this.$currScroll.next(event.currentTarget.scrollY);
  }

  public check(): Observable<boolean> {
    return this.$currScroll.asObservable().pipe(
      map(scrollValue => scrollValue >= this.IS_SHRINKED),
      distinctUntilChanged()
    );
  }

}
