
import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef, Inject, Renderer2, AfterViewInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { Observable, fromEvent } from 'rxjs';
import { takeUntil, take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarouselComponent implements OnInit, AfterViewInit {

  @ViewChild('slider') slider: ElementRef;
  @ViewChild('sliderItems') sliderItems: ElementRef;

  private sliderItemsElem: HTMLElement;

  private documentMousemoveListener$: Observable<any>;
  private documentMouseuplListener$: Observable<any>;

  private posInitial: number;
  private posFinal: number;
  private posX1 = 0;
  private posX2 = 0;
  private threshold = 100;
  private index = 0;
  private allowShift = true;

  private slides: any;
  private slidesLength: number;
  private slideSize: number;
  private firstSlide: any;
  private lastSlide: any;

  public products = [
    { 
      src: 'https://maxcdn.icons8.com/Color/PNG/96/Plants/pineapple-96.png'
    }, {
      src: 'https://maxcdn.icons8.com/Color/PNG/96/Plants/paprika-96.png'
    }, {
      src: 'https://maxcdn.icons8.com/Color/PNG/96/Plants/avocado-96.png'
    }, {
      src: 'https://maxcdn.icons8.com/Color/PNG/96/Food/banana-96.png'
    }, {
      src: 'https://maxcdn.icons8.com/Color/PNG/96/Plants/onion-96.png'
    }, {
      src: 'https://maxcdn.icons8.com/Color/PNG/96/Food/asparagus-96.png'
    }, {
      src: 'https://maxcdn.icons8.com/Color/PNG/96/Plants/watermelon-96.png'
    }, {
      src: 'https://maxcdn.icons8.com/Color/PNG/96/Food/eggplant-96.png'
    }
  ];

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2
  ) { }

  ngOnInit() {

    this.documentMousemoveListener$ = fromEvent(this.document, 'mousemove');
    this.documentMouseuplListener$ = fromEvent(this.document, 'mouseup');

    this.sliderItemsElem = this.sliderItems.nativeElement;
    this.slidesLength = this.products.length;

  }

  ngAfterViewInit() {
    this.slides = this.sliderItemsElem.querySelectorAll('li');
    this.slideSize = this.slides[0].offsetWidth;
    this.firstSlide = this.slides[0];
    this.lastSlide = this.slides[this.slidesLength - 1];

    this.slide();
  }
  
  public slide(): void {
    
    this.sliderItemsElem.appendChild(this.firstSlide.cloneNode(true));
    this.sliderItemsElem.insertBefore(this.lastSlide.cloneNode(true), this.firstSlide);
    this.slider.nativeElement.classList.add('loaded');

  }

  public dragStart (event): void {

    debugger;

    event.preventDefault();
    this.posInitial = this.sliderItemsElem.offsetLeft;

    switch(event.type) {
      case 'touchstart': {
        this.posX1 = event.touches[0].clientX;
      };
        break;
      default: {
        this.posX1 = event.clientX;
        this.documentMousemoveListener$
          .pipe(
            takeUntil(this.documentMouseuplListener$)
          )
          .subscribe(event => this.dragAction(event));
        this.documentMouseuplListener$
          .pipe(
            take(1)
          )
          .subscribe(_ => this.dragEnd());
      }
    }
    
  }

  public dragAction (event) {

    debugger;

    switch (event.type) {
      case 'touchmove': {
        this.posX2 = this.posX1 - event.touches[0].clientX;
        this.posX1 = event.touches[0].clientX;
      };
        break;
      default: {
        this.posX2 = this.posX1 - event.clientX;
        this.posX1 = event.clientX;
      }
    }

    this.sliderItemsElem.style.left =
      (this.sliderItemsElem.offsetLeft - this.posX2) + "px";

  }
  
  public dragEnd () {
    this.posFinal = this.sliderItemsElem.offsetLeft;
    if (this.posFinal - this.posInitial < -this.threshold) {
      this.shiftSlide(1, 'drag');
    } else if (this.posFinal - this.posInitial > this.threshold) {
      this.shiftSlide(-1, 'drag');
    } else {
      this.sliderItemsElem.style.left = (this.posInitial) + "px";
    }
  }
  
  public shiftSlide(dir, action) {

    this.sliderItemsElem.classList.add('shifting');
    
    if (this.allowShift) {
      if (!action) { this.posInitial = this.sliderItemsElem.offsetLeft; }

      if (dir == 1) {
        this.sliderItemsElem.style.left = (this.posInitial - this.slideSize) + "px";
        this.index++;      
      } else if (dir == -1) {
        this.sliderItemsElem.style.left = (this.posInitial + this.slideSize) + "px";
        this.index--;      
      }
    };
    
    this.allowShift = false;
  }
    
  public checkIndex (): void {
    this.sliderItemsElem.classList.remove('shifting');

    if (this.index == -1) {
      this.sliderItemsElem.style.left = -(this.slidesLength * this.slideSize) + "px";
      this.index = this.slidesLength - 1;
    }

    if (this.index == this.slidesLength) {
      this.sliderItemsElem.style.left = -(1 * this.slideSize) + "px";
      this.index = 0;
    }
    
    this.allowShift = true;
  }
  
}
