
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { bootstrapGrid } from '@app/core/models';

@Injectable({
  providedIn: 'root'
})
export class IsMobileService {

  private $currViewWidth: BehaviorSubject<number>;
  private LG_BREAKPOINT = bootstrapGrid.large;

  constructor() {
    this.$currViewWidth = new BehaviorSubject(window.innerWidth);
    window.addEventListener('resize', this._resizeHandler.bind(this));
  }

  private _resizeHandler(event: any) {
    this.$currViewWidth.next(event.currentTarget.innerWidth);
  }

  public check(): Observable<boolean> {
    return this.$currViewWidth.asObservable().pipe(
      map(currWidth => currWidth <= this.LG_BREAKPOINT),
      distinctUntilChanged()
    );
  }

}
