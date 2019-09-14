
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { mainPageSlides } from '@app/core/models';
import { SliderConf } from '@app/shared/interfaces';

@Component({
  selector: 'app-shop-home',
  templateUrl: './shop-home.component.html',
  styleUrls: ['./shop-home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShopHomeComponent implements OnInit {

  public showCarousel = false;
  public mainPageSlides: SliderConf[] = mainPageSlides;

  constructor() { }

  ngOnInit() {
  }

}
