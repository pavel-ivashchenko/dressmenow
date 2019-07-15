
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-shop-page',
  templateUrl: './shop-page.component.html',
  styleUrls: ['./shop-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShopPageComponent implements OnInit {

  public showCarousel = false;

  constructor() { }

  ngOnInit() {
  }

}
