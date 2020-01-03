
import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';

import { mainPageSlides } from '@app/core/models';
import { SliderConf } from '@app/shared/interfaces';

@Component({
  selector: 'app-shop-home',
  templateUrl: './shop-home.component.html',
  styleUrls: ['./shop-home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShopHomeComponent implements OnInit {

  // @ViewChild('parallax') parallax;

  public showCarousel = false;
  public mainPageSlides: SliderConf[] = mainPageSlides;
  public scrollTo: number;
  
  public show = false;

  constructor() { }

  ngOnInit() {
    // this.scrollTo = this.getScrollTo(this.parallax.nativeElement);
  }

  // PRIVATE METHODS

  private getScrollTo(topMostElement: HTMLElement): number {
    return topMostElement.offsetHeight + topMostElement.offsetTop;
  }

  public onShow():void {
    this.show = !this.show;
  }

}
