
import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { BehaviorSubject, Observable,  } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IsShrinkedService {

  private $currScroll: BehaviorSubject<number>;
  private IS_SHRINKED = 200;

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.$currScroll = new BehaviorSubject(this.document.documentElement.scrollTop);
    this.document.addEventListener('scroll', this.scrollHandler.bind(this));
  }

  private scrollHandler() {
    this.$currScroll.next(this.document.documentElement.scrollTop);
  }

  public check(): Observable<boolean> {
    return this.$currScroll.asObservable().pipe(
      map(scrollValue => scrollValue >= this.IS_SHRINKED),
      distinctUntilChanged()
    );
  }

}
