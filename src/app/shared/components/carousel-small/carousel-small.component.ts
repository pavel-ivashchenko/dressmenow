
import {
  Component, ChangeDetectionStrategy, Input, AfterViewInit,
  ChangeDetectorRef, ViewChild, ElementRef, OnDestroy
} from '@angular/core';

import { interval, Subject, Observable, merge, fromEvent } from 'rxjs';
import { takeUntil, switchMap, take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-carousel-small',
  templateUrl: './carousel-small.component.html',
  styleUrls: ['./carousel-small.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarouselSmallComponent implements AfterViewInit, OnDestroy {

  @Input() products = [
    {
      src: 'https://cdn-eu-ec.yottaa.net/5a8c2777312e587e9dba4f45/www.melanielyne.com/v~4b.1f/on/demandware.static/-/Sites/default/dw142d5aa2/melanie-lyne/2019/homepage/june-17/ml-trend-day-dresses-1.jpg?yocs=D_&yoloc=eu',
      name: 'product_1'
    },
    {
      src: 'https://cdn-eu-ec.yottaa.net/5a8c2777312e587e9dba4f45/www.melanielyne.com/v~4b.1f/on/demandware.static/-/Sites/default/dw89239cdd/melanie-lyne/2019/homepage/june-17/ml-trend-day-dresses-4.jpg?yocs=D_&yoloc=eu',
      name: 'product_2'
    },
    {
      src: 'https://cdn-eu-ec.yottaa.net/5a8c2777312e587e9dba4f45/www.melanielyne.com/v~4b.1f/on/demandware.static/-/Sites/default/dw4bb4f3cb/melanie-lyne/2019/homepage/june-17/ml-trend-day-dresses-3.jpg?yocs=D_&yoloc=eu',
      name: 'product_3',
    },
    {
      src: 'https://cdn-eu-ec.yottaa.net/5a8c2777312e587e9dba4f45/www.melanielyne.com/v~4b.1f/on/demandware.static/-/Sites/default/dwf8ffdd65/melanie-lyne/2019/homepage/june-17/ml-trend-day-dresses-2.jpg?yocs=D_&yoloc=eu',
      name: 'product_4'
    }
  ];

  @ViewChild('carousel') carousel: ElementRef;

  private componentDestroyed$: Subject<void> = new Subject();
  private cancelShiftInterval$: any = new Subject().pipe( takeUntil(this.componentDestroyed$) );
  private carouselMouseLeave$: Observable<any>;

  public active = 0;
  public next = 1;
  public prev = this.products.length - 1;

  constructor(private cdr: ChangeDetectorRef) { }

  ngAfterViewInit() {
    this.carouselMouseLeave$ = this.getCarouselMouseLeaveListener();

    this.startMouseEnterListening();
    this.startShiftInterval();
  }

  private startShiftInterval(): void {
    interval(3000)
      .pipe(
        takeUntil(
          merge(
            this.componentDestroyed$,
            this.cancelShiftInterval$
          )
        )
      )
      .subscribe(_ => { this.gotoNext(); });
  }

  private startMouseEnterListening(): void {
    fromEvent(this.carousel.nativeElement, 'mouseenter')
      .pipe(
        takeUntil(this.componentDestroyed$),
        tap(_ => { this.cancelShiftInterval$.next(); }),
        switchMap(_ => this.carouselMouseLeave$)
      )
      .subscribe();
  }

  private getCarouselMouseLeaveListener(): Observable<any> {
    return fromEvent(this.carousel.nativeElement, 'mouseleave')
      .pipe(
        take(1),
        tap(_ => { this.startShiftInterval(); })
      );
  }

  public gotoPrev(): void {
    this.active > 0 ?
      this.gotoNum(this.active - 1) :
      this.gotoNum(this.products.length - 1);
  }

  public gotoNext(): void {
    this.active < this.products.length - 1 ?
      this.gotoNum(this.active + 1) :
      this.gotoNum(0);
  }

  private gotoNum(number): void {

    this.active = number;

    this.prev = this.active - 1 === -1 ?
      this.products.length - 1 : this.active - 1;

    this.next =
      this.active + 1 === this.products.length ?
        0 : this.active + 1;

    this.cdr.detectChanges();

  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.unsubscribe();
  }

}
