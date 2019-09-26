
import {
  Component, OnInit, ChangeDetectionStrategy, AfterViewInit,
  ViewChild, ElementRef, Renderer2, ChangeDetectorRef, OnDestroy, Input } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';

import { BreakpointsService } from '@app/core/services/breakpoints.service';

@Component({
  selector: 'app-carousel-simple',
  templateUrl: './carousel-simple.component.html',
  styleUrls: ['./carousel-simple.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarouselSimpleComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('slider') slider: ElementRef;
  @Input() slides: { src: string; title: number }[] = [
    {
      src: 'https://www.lulus.com/images/product/medium/2589152_498232.jpg',
      title: 1
    }, {
      src: 'https://www.lulus.com/images/product/medium/2589152_498232.jpg',
      title: 2
    }, {
      src: 'https://www.lulus.com/images/product/medium/2589152_498232.jpg',
      title: 3
    }, {
      src: 'https://www.lulus.com/images/product/medium/2589152_498232.jpg',
      title: 4
    }, {
      src: 'https://www.lulus.com/images/product/medium/2589152_498232.jpg',
      title: 5
    }
  ];
  private el: HTMLElement;
  private currIdx = 0;
  private lastSlideIdx = this.slides.length - 1;
  private componentDestroyed$: Subject<void> = new Subject();
  
  public firstIdx = this.lastSlideIdx;
  public activeIdxs: number[] = [];

  constructor(
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef,
    private breakpointsService: BreakpointsService
  ) { }

  ngOnInit() {
    this.el = this.slider.nativeElement;
    this.breakpointsService.getCurrWidthTier()
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(_ => {
        this.activeIdxs = this.getArrOfActiveIdxs(this.getQtyOfVisibleSlides(this.el), this.lastSlideIdx, this.currIdx);
        this.cdr.detectChanges();
      });
  }

  ngAfterViewInit() {
    this.activeIdxs = this.getArrOfActiveIdxs(this.getQtyOfVisibleSlides(this.el), this.lastSlideIdx);
    this.cdr.detectChanges();
  }

  public onNext(): void {
    fromEvent(this.el, 'transitionend')
      .pipe(first())
      .subscribe(_ => {
        this.firstIdx = this.activeIdxs[0];
        this.resetPositionLeft(this.el);
        this.activeIdxs = this.getArrOfActiveIdxs(this.getQtyOfVisibleSlides(this.el), this.lastSlideIdx, this.currIdx);
        this.turnOffTransition(this.el);
        this.cdr.detectChanges();
      });

    this.currIdx = this.currIdx + 1 > this.lastSlideIdx ? 0 : this.currIdx + 1;
    this.turnOnTransition(this.el);
    this.shiftLeft(this.el, this.getSingleSlideWidth(this.el));
  }

  public onPrev(): void {
    fromEvent(this.el, 'transitionend')
      .pipe(first())
      .subscribe(_ => {
        this.firstIdx = this.firstIdx ? this.firstIdx - 1 : this.lastSlideIdx;
        this.resetPositionLeft(this.el);
        this.activeIdxs = this.getArrOfActiveIdxs(this.getQtyOfVisibleSlides(this.el), this.lastSlideIdx, this.currIdx);
        this.turnOffTransition(this.el);
        this.cdr.detectChanges();
      });

    this.currIdx = this.currIdx - 1 < 0 ? this.lastSlideIdx : this.currIdx - 1;
    this.turnOnTransition(this.el);
    this.shiftRight(this.el, this.getSingleSlideWidth(this.el));
  }

  // PRIVATE METHODS

  private getSingleSlideWidth(slider: HTMLElement): number {
    return (slider.children[0] as HTMLElement).offsetWidth;
  }

  private resetPositionLeft(el: HTMLElement): void {
    this.renderer.removeStyle(el, 'left');
  }

  private shiftLeft(el: HTMLElement, shift: number): void {
    this.renderer.setStyle(el, 'left', `-${shift}px`);
  }

  private shiftRight(el: HTMLElement, shift: number): void {
    this.renderer.setStyle(el, 'left', `${shift}px`);
  }

  private turnOnTransition(el: HTMLElement): void {
    this.renderer.addClass(el, 'transition-on');
  }

  private turnOffTransition(el: HTMLElement): void {
    this.renderer.removeClass(el, 'transition-on');
  }

  private getQtyOfVisibleSlides(slider: HTMLElement): number {
    return Math.round(slider.offsetWidth / this.getSingleSlideWidth(slider));
  }

  private getArrOfActiveIdxs(length: number, maxIdx: number, currIdx: number = 0): number[] {
    let startFromZero = 0;
    return Array.from(Array(length + 1), (_, idx) => idx + currIdx > maxIdx ? startFromZero++ : idx + currIdx);
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.unsubscribe();
  }

}
