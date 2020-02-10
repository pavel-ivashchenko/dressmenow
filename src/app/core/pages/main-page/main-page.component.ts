
import {
  Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef,
  AfterViewInit, ViewChild, Inject
} from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { GRID_TIERS } from '@app/shared/constants';
import { toggleVisiblityOnScroll } from '@app/shared/helpers';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainPageComponent implements OnInit, AfterViewInit {

  @ViewChild('video') video;
  @ViewChild('parallax') parallax;

  public isVideoBgVisible = false;
  public isPlayOverlayVisible = false;
  public isCarouselVisible = false;
  public isCollectionVisible = false;
  public isTitlesSectionVisible = false;
  public isAdFeaturesVisible = true;
  public isSloganVisible$: Observable<boolean>;

  private sloganVisibilityHeight = 500;

  public AdSectionData = [
    {
      tooltipMsg: 'Найпопулярніше',
      tooltipPos: 'above',
      title: 'НАЙЦІКАВІШЕ',
      routerLink: '#',
      imageSrc: 'https://www.lulus.com/images/product/xlarge/2025102_344812.jpg?w=560',
      imageAlt: 'Bestsellers title image',
      figCaption: 'Bestsellers'
    }, {
      tooltipMsg: 'Літні сукні',
      tooltipPos: 'above',
      title: 'ВІДПУСТКА',
      routerLink: '#',
      imageSrc: 'https://www.lulus.com/images/product/xlarge/5145450_1025582.jpg?w=560',
      imageAlt: 'Vacation title image',
      figCaption: 'A place in the sun'
    }, {
      tooltipMsg: 'Міні сукні',
      tooltipPos: 'above',
      title: 'ВЕЧІРКА',
      routerLink: '#',
      imageSrc: 'https://www.lulus.com/images/product/xlarge/3911990_607602.jpg?w=560',
      imageAlt: 'Party title image',
      figCaption: 'Make it mini'
    }, {
      tooltipMsg: 'Вечірні сукні',
      tooltipPos: 'above',
      title: 'ЕЛЕГАНТНІСТЬ',
      routerLink: '#',
      imageSrc: 'https://www.lulus.com/images/product/xlarge/2717262_511092.jpg?w=560',
      imageAlt: 'Dresses title image',
      figCaption: 'Save the night'
    }, {
      tooltipMsg: 'Denim & casual',
      tooltipPos: 'above',
      title: 'КОЖНОГО ДНЯ',
      routerLink: '#',
      imageSrc: 'https://www.lulus.com/images/product/xlarge/4521570_858582.jpg?w=560',
      imageAlt: 'Casual title image',
      figCaption: 'The way you are'
    }
  ];
  public Benefits = [
    {
      title: 'GIVE $20, GET $20',
      subtitle: 'Share the love and refer a friend',
      imageSrc: 'https://image.flaticon.com/icons/svg/1746/1746336.svg',
      imageAlt: ''
    }, {
      title: 'LOVE REWARDS',
      subtitle: 'Share the love and refer a friend',
      imageSrc: 'https://image.flaticon.com/icons/svg/2485/2485909.svg',
      imageAlt: ''
    }, {
      title: 'UNIDAYS',
      subtitle: 'Share the love and refer a friend',
      imageSrc: 'https://image.flaticon.com/icons/svg/1046/1046342.svg',
      imageAlt: ''
    }, {
      title: 'GET APP-Y',
      subtitle: 'Share the love and refer a friend',
      imageSrc: 'https://image.flaticon.com/icons/svg/1579/1579817.svg',
      imageAlt: ''
    }
  ];

  constructor(
    private cdr: ChangeDetectorRef,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit() {
    this.isVideoBgVisible = this.document.documentElement.offsetWidth >= GRID_TIERS.LG;
    this.isSloganVisible$ = toggleVisiblityOnScroll(this.parallax.nativeElement, this.sloganVisibilityHeight, false);
  }

  ngAfterViewInit() {
    if (this.video) {
      const playPromise = this.video.nativeElement.play();
      if (playPromise) {
        playPromise.catch(_ => {
          this.isPlayOverlayVisible = this.video.nativeElement.paused;
          this.cdr.detectChanges();
        });
      }
    }
  }

  public onPlay(): void {
    this.isPlayOverlayVisible = false;
    this.video.nativeElement.play();
  }

}
