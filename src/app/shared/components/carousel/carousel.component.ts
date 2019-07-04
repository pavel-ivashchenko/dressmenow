
import { Component, OnDestroy, ChangeDetectionStrategy, ViewChild, ElementRef, Inject, Renderer2, AfterViewInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';

import { Observable, fromEvent, Subject, merge } from 'rxjs';
import { takeUntil, take, map, switchMap, tap, startWith, scan, filter, shareReplay, withLatestFrom } from 'rxjs/operators';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarouselComponent implements AfterViewInit, OnDestroy {

  @ViewChild('sliderItems') sliderItems: ElementRef;
  @Input() products: any[] = [
    {
      src: 'https://maxcdn.icons8.com/Color/PNG/96/Plants/pineapple-96.png',
      number: 1
    }, {
      src: 'https://maxcdn.icons8.com/Color/PNG/96/Plants/paprika-96.png',
      number: 2
    }, {
      src: 'https://maxcdn.icons8.com/Color/PNG/96/Plants/avocado-96.png',
      number: 3
    }, {
      src: 'https://maxcdn.icons8.com/Color/PNG/96/Food/banana-96.png',
      number: 4
    }, {
      src: 'https://maxcdn.icons8.com/Color/PNG/96/Plants/onion-96.png',
      number: 5
    }, {
      src: 'https://maxcdn.icons8.com/Color/PNG/96/Food/asparagus-96.png',
      number: 6
    }, {
      src: 'https://maxcdn.icons8.com/Color/PNG/96/Plants/watermelon-96.png',
      number: 7
    }, {
      src: 'https://maxcdn.icons8.com/Color/PNG/96/Food/eggplant-96.png',
      number: 8
    }, {
      src: 'https://maxcdn.icons8.com/Color/PNG/96/Food/eggplant-96.png',
      number: 9
    }, {
      src: 'https://maxcdn.icons8.com/Color/PNG/96/Food/eggplant-96.png',
      number: 10
    }, {
      src: 'https://maxcdn.icons8.com/Color/PNG/96/Food/eggplant-96.png',
      number: 11
    }, {
      src: 'https://maxcdn.icons8.com/Color/PNG/96/Food/eggplant-96.png',
      number: 12
    }
  ];
  @Input() productRedirectBaseURL = '#';

  private VISIBLE_SLIDES_MAX_QTY = 5;
  private sliderItemsElem: HTMLElement;
  private slides: any;

  private sliderState$: Observable<any>;
  private sliderSubscribtions$: any;

  // event listeners
  private transitionendListener$: Observable<any>;
  private mousedownListener$: Observable<any>;
  private mouseupListener$: Observable<any>;
  private mousemoveListener$: Observable<any>;
  private touchstartListener$: Observable<any>;
  private touchendListener$: Observable<any>;
  private touchmoveListener$: Observable<any>;

  // event handlers
  private dragStart$: any = this.getDragStartHandler();
  private dragAction$: any = this.getDragActionHandler();
  private dragEnd$: any = this.getDragEndHandler();
  private shiftSlide$: any = this.getShiftSlideHandler();
  private checkIndex$: any = this.getCheckIndexHandler();

  private preventDefault = (source: Observable<any>) => source.pipe(tap(event => (event.preventDefault(), event.stopPropagation())));

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private router: Router
  ) { }

  ngAfterViewInit() {

    this.sliderItemsElem = this.sliderItems.nativeElement;
    this.slides = this.sliderItemsElem.querySelectorAll('li');

    this.mouseupListener$ =
      fromEvent(this.sliderItemsElem, 'mouseup')
        .pipe(
          take(1),
          tap(event => {
            this.dragEnd$.next(event);
            this.shiftSlide$.next();
          })
        );

    this.mousemoveListener$ =
      fromEvent(this.sliderItemsElem, 'mousemove')
        .pipe(
          takeUntil(this.mouseupListener$),
          tap(event => this.dragAction$.next(event.clientX))
        );

    this.mousedownListener$ =
      fromEvent(this.sliderItemsElem, 'mousedown')
        .pipe(
          switchMap((event: any) => {
            event.preventDefault();
            event.stopPropagation();
            this.dragStart$.next(event.clientX);
            return this.mousemoveListener$;
          })
        );

    this.mousedownListener$ = this.getStartEventHandler();
    this.touchstartListener$ = this.getStartEventHandler(true);

    this.transitionendListener$ =
      fromEvent(this.sliderItemsElem, 'transitionend')
        .pipe(
          tap(_ => this.checkIndex$.next())
        );

    this.sliderState$ = this.getSliderState();

    this.sliderSubscribtions$ =
      merge(
        this.sliderState$,
        this.mousedownListener$,
        this.transitionendListener$
      )
      .subscribe();

    this.initSlider();

  }

  private initSlider(): void {

    this.sliderState$
      .pipe(
        take(1),
        map(({ currIdx }) => {

          Array.from(this.slides).slice(0, 1).forEach((slide: HTMLElement) => {
            const clone = slide.cloneNode(true);
            this.renderer.setStyle(clone, 'background', 'red');
            this.sliderItemsElem.appendChild(clone);
          });

          Array.from(this.slides).slice(this.slides.length - this.VISIBLE_SLIDES_MAX_QTY, this.slides.length)
            .forEach((slide: HTMLElement) => {
              const clone = slide.cloneNode(true);
              this.renderer.setStyle(clone, 'background', 'green');
              this.sliderItemsElem.insertBefore(clone, this.slides[0]);
            });

          this.renderer.setStyle(this.sliderItemsElem, 'left', `${ -(currIdx * this.getSingleSlideWidthVW()) }vw`);

        })
      ).subscribe();

  }

  private getSliderState(): Observable<any> {
    return merge(
      this.dragStart$,
      this.dragAction$,
      this.dragEnd$,
      this.shiftSlide$,
      this.checkIndex$
    ).pipe(
      startWith(
        { // TODO check if all of the vars are used
          allowShift: true,
          singleSlideWidthPX: null,
          allSlidesWidthPX: null,
          initClickX: 0,
          initPositionPX: 0,
          currDiffPX: 0,
          dragDirection: 0,
          singleSlideWidthVW: this.getSingleSlideWidthVW(),
          currIdx: 5,
          shiftClassCSS: 'items__shifting',
          shiftTresholdPX: 15
        }
      ),
      scan((state, curr) => ({ ...state, ...curr })),
      shareReplay(1)
    );
  }

  // helper methods

  private getSingleSlideWidthVW(): number {
    const qtyPerView = Math.round(this.document.documentElement.clientWidth / this.slides[0].offsetWidth);
    return 100 / qtyPerView;
  }

  private getSingleSlideWidthPX(): number {
    return +this.slides[0].offsetWidth;
  }

  private getCurrIdx(singleSlideWidthPX, dragDirection, shiftTresholdPX, maxIdx) {

    const currShift = Math.abs(this.sliderItemsElem.offsetLeft);
    const idx =
      +(currShift / singleSlideWidthPX).toFixed(0) +
      ((currShift % singleSlideWidthPX) > shiftTresholdPX ? dragDirection : 0);

    return idx >= maxIdx ?
      maxIdx : idx <= 0 ?
        0 : idx;

  }

  // init event listeners

  private getStartEventHandler(isTouchEvent: boolean = false): Observable<any> {
    return fromEvent(this.sliderItemsElem, isTouchEvent ? 'touchstart' : 'mousedown')
      .pipe(
        this.preventDefault,
        switchMap((event: any) => {
          this.dragStart$.next(isTouchEvent ? event.touches[0].clientX : event.clientX);
          return isTouchEvent ? this.touchmoveListener$ : this.mousemoveListener$;
        })
      );
  }

  // init event handlers

  private getDragStartHandler(): Observable<any> {
    return new Subject()
      .pipe(
        map((clientX: number) => ({
          initPositionPX: this.sliderItemsElem.offsetLeft,
          initClickX: +clientX,
          singleSlideWidthPX: this.getSingleSlideWidthPX(),
          singleSlideWidthVW: this.getSingleSlideWidthVW(),
          allSlidesWidthPX: this.getSingleSlideWidthPX() * this.products.length,
          currDiffPX: 0
        }))
      );
  }

  private getDragActionHandler(): Observable<any> {
    return new Subject()
      .pipe(
        switchMap((currClickX: number) => this.sliderState$
          .pipe(
            take(1),
            map(({ allSlidesWidthPX, singleSlideWidthPX, initClickX }) => {

              const dragDistance = initClickX - currClickX;
              let newPosition = this.sliderItemsElem.offsetLeft - dragDistance;

              newPosition = newPosition > 0 ?
                -(allSlidesWidthPX) : newPosition < -(allSlidesWidthPX + singleSlideWidthPX) ?
                  -(singleSlideWidthPX) : newPosition;

              this.renderer.setStyle(this.sliderItemsElem, 'left', `${ newPosition }px`);

              return {
                initClickX: currClickX
              };

            })
          ))
      );
  }

  private getDragEndHandler(): Observable<any> {
    return new Subject()
      .pipe(
        withLatestFrom(this.sliderState$),
        filter(([event, { initPositionPX }]: [any, any]) => {
          if (this.sliderItemsElem.offsetLeft - initPositionPX) { return true; }
          this.router.navigate(['dresses', `${ event.target.parentNode.id }`]); // TODO ADD INPUT VARIABLE URL FOR ITEMS
          return false;
        }),
        map(([event, { currIdx, shiftTresholdPX, singleSlideWidthPX, initPositionPX }]) => {
          event.preventDefault();
          event.stopPropagation();

          const dragDirection = initPositionPX > this.sliderItemsElem.offsetLeft ? 1 : -1;

          currIdx = this.getCurrIdx(singleSlideWidthPX, dragDirection, shiftTresholdPX, this.products.length + 1);

          return { currIdx };
        })
      );
  }

  private getShiftSlideHandler(): Observable<any> {
    return new Subject()
      .pipe(
        switchMap(_ => this.sliderState$
          .pipe(
            take(1),
            filter(({ allowShift }) => allowShift),
            map(({ currIdx, shiftClassCSS }) => {
              this.renderer.addClass(this.sliderItemsElem, shiftClassCSS);

              const test = this.getSingleSlideWidthVW();

              this.renderer.setStyle(this.sliderItemsElem, 'left', `-${ currIdx * this.getSingleSlideWidthVW() }vw`);
              return { allowShift: false };
            }))
          )
      );
  }

  private getCheckIndexHandler(): Observable<any> {
    return new Subject()
      .pipe(
        switchMap(_ => this.sliderState$
          .pipe(
            take(1),
            map(({ currIdx, shiftClassCSS }) => {

              this.renderer.removeClass(this.sliderItemsElem, shiftClassCSS);

              currIdx = currIdx >= this.products.length + 1 ? 1 :
                currIdx <= 0 ? this.products.length :
                  currIdx;

              this.renderer.setStyle(this.sliderItemsElem, 'left', `-${ currIdx * this.getSingleSlideWidthVW() }vw`);

              return {
                currIdx,
                allowShift: true
              };

            }))
          )
      );
  }

  ngOnDestroy(): void {
    this.sliderSubscribtions$.unsubscribe();
  }

}
