
import {
  Component, OnInit, ChangeDetectionStrategy, AfterViewInit,
  ViewChild, ElementRef, Renderer2, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { fromEvent, Observable, Subject } from 'rxjs';
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
  private el: HTMLElement;

  public slides = [
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

  public currIdx = 0;
  public lastSlideIdx = this.slides.length - 1;
  public firstIdx = this.lastSlideIdx;
  public activeIdxs;
  private componentDestroyed$: Subject<void> = new Subject();

  constructor(
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef,
    private breakpointsService: BreakpointsService
  ) { }

  ngOnInit() {
    this.el = this.slider.nativeElement;
    this.breakpointsService.getCurrWidthTier()
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(res => {
        debugger;
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

        this.renderer.removeStyle(this.el, 'left');

        this.activeIdxs = this.getArrOfActiveIdxs(this.getQtyOfVisibleSlides(this.el), this.lastSlideIdx, this.currIdx);

        this.cdr.detectChanges();

        this.renderer.removeClass(this.el, 'transition-on');

      });

    this.currIdx = this.currIdx + 1 > this.lastSlideIdx ? 0 : this.currIdx + 1;

    this.renderer.addClass(this.el, 'transition-on');

    this.renderer.setStyle(this.el, 'left', `-${this.getSingleSlideWidth(this.el)}px`);

  }

  public onPrev(): void {

    fromEvent(this.el, 'transitionend')
      .pipe(first())
      .subscribe(_ => {

        this.firstIdx = this.activeIdxs[0];

        this.renderer.removeStyle(this.el, 'left');

        this.activeIdxs = this.getArrOfActiveIdxs(this.getQtyOfVisibleSlides(this.el), this.lastSlideIdx, this.currIdx);

        this.cdr.detectChanges();

        this.renderer.removeClass(this.el, 'transition-on');

      });

    this.currIdx = this.currIdx - 1 < 0 ? this.lastSlideIdx : this.currIdx - 1;

    this.renderer.addClass(this.el, 'transition-on');

    this.renderer.setStyle(this.el, 'left', `${this.getSingleSlideWidth(this.el)}px`);

  }

  // PRIVATE METHODS

  private getSingleSlideWidth(slider: HTMLElement): number {
    return (slider.children[0] as HTMLElement).offsetWidth;
  }

  private getActiveSlides(slider: HTMLElement): number[] {
    return Array.from({ length: (slider.offsetWidth / this.getSingleSlideWidth(this.el)) + 2 }, (_, idx) => idx);
  }

  private moveSlider(slider: HTMLElement, shift: number): void {
    this.renderer.setStyle(slider, 'left', `-${shift}px`);
  }

  private moveSliderRight(slider: HTMLElement, shift: number): void {
    this.renderer.setStyle(slider, 'left', `${shift}px`);
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
