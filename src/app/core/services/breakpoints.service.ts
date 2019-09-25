
import { Injectable } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreakpointsService {

  private currWidthTier$: BehaviorSubject<string | null> = new BehaviorSubject(null);
  private breakpoints = {
    '(min-width: 0px) and (max-width: 575px)': 'xs',
    '(min-width: 576px) and (max-width: 767px)': 'sm',
    '(min-width: 768px) and (max-width: 991px)': 'md',
    '(min-width: 992px) and (max-width: 1199px)': 'lg',
    '(min-width: 1200px)': 'xl'
  };

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver
      .observe(Array.from(Object.keys(this.breakpoints)))
      .subscribe((state: BreakpointState) => this.currWidthTier$.next(
          this.breakpoints[ Object.keys(state.breakpoints).find(b => state.breakpoints[b]) ]
        )
      );
  }

  public getCurrWidthTier(): Observable<string> {
    return this.currWidthTier$.asObservable();
  }

}
