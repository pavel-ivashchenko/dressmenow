
import { Observable, fromEvent } from 'rxjs';
import { debounceTime, map, distinctUntilChanged, startWith } from 'rxjs/operators';

export const toggleVisiblityOnScroll =
(elem: HTMLElement, scrollTreshold: number, condition: boolean = true, startWithValue: boolean = true):
  Observable<boolean> => {
    return fromEvent(elem, 'scroll').pipe(
      debounceTime(100),
      map((res: any) => condition ?
        res.target.scrollTop > scrollTreshold :
          res.target.scrollTop < scrollTreshold),
      distinctUntilChanged(),
      startWith(startWithValue)
    );
};
