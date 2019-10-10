
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
  @Input() slides: { src: string; title: number; order?: number }[] = [
    { src: 'https://upload.wikimedia.org/wikipedia/commons/0/02/Cat_IMG_0799.jpg',
      title: 1
    }, { src: 'http://www.armadalekennel.com/wp-content/uploads/2017/09/cat-img.jpg',
      title: 2
    }, { src: 'https://seresto.com.au/static/media/images/welcome-cat-mob-img.jpg',
      title: 3
    }, { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiPQYpM-_mBGrKSIDnZ-xjWV4_PuOrF7V7qR44plcbqjQ1f3wT',
      title: 4
    }, { src: 'https://cdn.images.express.co.uk/img/dynamic/128/590x/secondary/1441354.jpg?r=1533045611820',
      title: 5
    }
  ];
  private el: HTMLElement;
  private currIdx = 0;
  private lastSlideIdx = this.slides.length - 1;
  private componentDestroyed$: Subject<void> = new Subject();

  public firstIdx = this.lastSlideIdx;
  public lastIdx = 0;
  public activeIdxs: number[] = [];

  private qtyOfActiveSlides: number;

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
    this.qtyOfActiveSlides = this.getQtyOfVisibleSlides(this.el);

    this.firstIdx = this.qtyOfActiveSlides < this.lastSlideIdx ? this.qtyOfActiveSlides + 1 : this.lastSlideIdx;

    this.activeIdxs = this.getArrOfActiveIdxs(this.qtyOfActiveSlides, this.lastSlideIdx);
    this.slides.forEach((slide, idx) => {
      slide.order = this.activeIdxs.includes(idx) ? this.activeIdxs.indexOf(idx) + 1 : null;
    });
    this.cdr.detectChanges();
  }

  public onNext(): void {
    fromEvent(this.el, 'transitionend')
      .pipe(first())
      .subscribe(_ => {
        this.firstIdx = this.activeIdxs[0];
        this.resetPositionLeft(this.el);
        this.activeIdxs = this.getArrOfActiveIdxs(this.getQtyOfVisibleSlides(this.el), this.lastSlideIdx, this.currIdx);
        this.slides.forEach((slide, idx) => {
          slide.order = this.activeIdxs.includes(idx) ? this.activeIdxs.indexOf(idx) + 1 : null;
        });
        this.turnOffTransition(this.el);
        this.cdr.detectChanges();
      });

    this.currIdx = this.currIdx + 1 > this.lastSlideIdx ? 0 : this.currIdx + 1;
    this.turnOnTransition(this.el);
    this.shiftLeft(this.el, this.getSingleSlideWidth(this.el));
  }

  public onPrev(): void {
    // fromEvent(this.el, 'transitionend')
    //   .pipe(first())
    //   .subscribe(_ => {
    //     this.firstIdx = this.firstIdx ? this.firstIdx - 1 : this.lastSlideIdx;
    //     this.resetPositionLeft(this.el);
    //     this.activeIdxs = this.getArrOfActiveIdxs(this.getQtyOfVisibleSlides(this.el), this.lastSlideIdx, this.currIdx);
    //     this.turnOffTransition(this.el);
    //     this.cdr.detectChanges();
    //   });

    // this.currIdx = this.currIdx - 1 < 0 ? this.lastSlideIdx : this.currIdx - 1;
    // this.turnOnTransition(this.el);
    // this.shiftRight(this.el, this.getSingleSlideWidth(this.el));
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
    return Array.from(Array(length), (_, idx) => idx + currIdx > maxIdx ? startFromZero++ : idx + currIdx);
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.unsubscribe();
  }

}
