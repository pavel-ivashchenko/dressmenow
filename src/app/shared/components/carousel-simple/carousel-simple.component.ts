
import {
  Component, OnInit, ChangeDetectionStrategy, Input,
  ViewChild, ElementRef, Renderer2, ChangeDetectorRef
} from '@angular/core';
import { fromEvent } from 'rxjs';
import { first } from 'rxjs/operators';
import { pipe, shallowCopyArrOfObjects, repeatArrFlat } from '@app/shared/helpers';
import { RawSlide, Slide } from './interfaces';

@Component({
  selector: 'app-carousel-simple',
  templateUrl: './carousel-simple.component.html',
  styleUrls: ['./carousel-simple.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarouselSimpleComponent implements OnInit {

  @ViewChild('slider') slider: ElementRef;
  @Input() rawSlides: RawSlide[] = [
    { img: 'https://www.lulus.com/images/product/xlarge/2750772_541442.jpg?w=238',
      title: '1',
      href: '#'
    }, { img: 'https://www.lulus.com/images/product/xlarge/3574160_691152.jpg?w=238',
      title: '2',
      href: '#'
    }, { img: 'https://www.lulus.com/images/product/xlarge/4889291_888282.jpg?w=238',
      title: '3',
      href: '#'
    }, { img: 'https://www.lulus.com/images/product/xlarge/3465350_670782.jpg?w=238',
      title: '4',
      href: '#'
    }, { img: 'https://www.lulus.com/images/product/xlarge/2782620_541002.jpg?w=238',
      title: '5',
      href: '#'
    }, { img: 'https://www.lulus.com/images/product/xlarge/4311290_852582.jpg?w=238',
      title: '6',
      href: '#'
    }, { img: 'https://www.lulus.com/images/product/xlarge/4316830_856342.jpg?w=238',
      title: '7',
      href: '#'
    }, { img: 'https://www.lulus.com/images/product/xlarge/4887490_907162.jpg?w=238',
      title: '8',
      href: '#'
    }
  ];

  public slides: Slide[];
  private el: HTMLElement;
  private initSlides: Function;

  private TRANSITION_END_EVENT_NAME = 'transitionend';
  private TRANSITION_IS_ON_CSS_CLASS = 'transition-on';

  private MIN_SLIDES_QTY = 2;
  private ORDERED_SLIDES_QTY = 6;
  private MAX_ORDER = 5;

  private firstOrderedSlideIdx: number;
  private lastOrderedSlideIdx: number;

  constructor(private renderer: Renderer2, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.el = this.slider.nativeElement;

    this.initSlides = pipe(
      shallowCopyArrOfObjects,
      this.normalizeSlidesQty(this.MIN_SLIDES_QTY, this.ORDERED_SLIDES_QTY, repeatArrFlat),
      this.getFormattedSlides(this.ORDERED_SLIDES_QTY, this.calcEdgeSlideIdx)
    );

    this.slides = this.initSlides(this.rawSlides);

    this.firstOrderedSlideIdx = this.slides.length - 1;
    this.lastOrderedSlideIdx = this.MAX_ORDER - 1;
  }

  public onCtrlClick(onNext: boolean): void {
    fromEvent(this.el, this.TRANSITION_END_EVENT_NAME)
      .pipe(first())
      .subscribe(_ => {

        this.toggleTransition(this.el, false);
        this.resetPositionLeft(this.el);

        const direction = onNext ? 1 : -1;

        this.changeSlidesOrder({
          slides: this.slides,
          direction,
          startWithOrder: onNext ? 0 : this.MAX_ORDER,
          startWithIdx: onNext ? this.firstOrderedSlideIdx : this.lastOrderedSlideIdx,
          orderedSlidesQty: this.ORDERED_SLIDES_QTY
        });

        this.lastOrderedSlideIdx = this.calcEdgeSlideIdx(this.lastOrderedSlideIdx + direction, this.slides.length - 1);
        this.firstOrderedSlideIdx = this.calcEdgeSlideIdx(this.firstOrderedSlideIdx + direction, this.slides.length - 1);

        this.cdr.detectChanges();
      });
    this.toggleTransition(this.el, true);
    this.shiftElem(this.el, this.getSingleSlideWidth(this.el, this.firstOrderedSlideIdx), onNext);
  }

  private normalizeSlidesQty = (minSlidesQty: number, orderedSlidesQty: number, repeatArr: Function) =>
    (rawSlides: RawSlide[]): RawSlide[] => {
      return rawSlides.length && rawSlides.length <= minSlidesQty ?
        [ ...rawSlides, rawSlides[0] ] : rawSlides.length > minSlidesQty && rawSlides.length <= orderedSlidesQty ?
          repeatArr(rawSlides, Math.ceil(orderedSlidesQty / rawSlides.length) + 1 ) : rawSlides;
    }

  private getFormattedSlides = (orderedSlidesQty: number, calcEdgeSlideIdx: Function) =>
    (slides: any[]): Slide[] => {
      for (let idx = slides.length - 1, order = 0; order < slides.length; idx++, order++) {
        idx = calcEdgeSlideIdx(idx, slides.length - 1);
        slides[idx] = {
          ...slides[idx],
          visual_order: order >= orderedSlidesQty ? null : order,
          slide_number: idx
        };
      }
      return slides;
    }

  private changeSlidesOrder(
    { slides, direction, startWithOrder, startWithIdx, orderedSlidesQty }:
    { slides: any[], direction: number, startWithOrder: number, startWithIdx: number, orderedSlidesQty: number }
  ): void {
    let order = startWithOrder;
    let idx = startWithIdx;
    for (; order < orderedSlidesQty && order >= 0; idx += direction) {
      idx = this.calcEdgeSlideIdx(idx, slides.length - 1);
      slides[idx].visual_order = idx === startWithIdx ? null : order;
      order = idx === startWithIdx ? order : direction + order;
    }
  }

  private calcEdgeSlideIdx(currIdx: number, lastSlideIdx: number): number {
    return currIdx > lastSlideIdx ?
      0 : currIdx < 0 ?
        lastSlideIdx : currIdx;
  }

  private getSingleSlideWidth(slider: HTMLElement, firstVisibleSlideIdx): number {
    return (slider.children[firstVisibleSlideIdx] as HTMLElement).offsetWidth;
  }

  private resetPositionLeft(el: HTMLElement): void {
    this.renderer.removeStyle(el, 'left');
  }

  private shiftElem(el: HTMLElement, shift: number, toTheRight: boolean): void {
    this.renderer.setStyle(el, 'left', `${ toTheRight ? '-' : '+' }${ shift }px`);
  }

  private toggleTransition(el: HTMLElement, isOn: boolean): void {
    isOn ?
      this.renderer.addClass(el, this.TRANSITION_IS_ON_CSS_CLASS) :
        this.renderer.removeClass(el, this.TRANSITION_IS_ON_CSS_CLASS);
  }

}
