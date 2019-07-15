
import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-carousel-small',
  templateUrl: './carousel-small.component.html',
  styleUrls: ['./carousel-small.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarouselSmallComponent {

  @Input() products = [
    {
      src: 'https://t3.ftcdn.net/jpg/01/21/39/24/240_F_121392436_TyJ0RrKUxTni7ADl2tEmxhiWB3DQpa99.jpg',
      name: 'product_1'
    },
    {
      src: 'https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/assets/share_new.jpg',
      name: 'product_2'
    },
    {
      src: 'https://tubikstudio.com/wp-content/uploads/2017/12/design_party_graphic_design_tubik-1.png',
      name: 'product_3'
    },
    {
      src: 'https://apeonthemoon.com/wp-content/uploads/2018/11/NbIIkGcA.jpeg',
      name: 'product_4',
    },
    {
      src: 'https://apeonthemoon.com/wp-content/uploads/2018/11/NbIIkGcA.jpeg',
      name: 'product_5'
    }
  ];

  public active = 0;
  public next = 1;
  public prev = this.products.length - 1;

  constructor() { }

  public gotoPrev(): void {
    this.active > 0 ?
      this.gotoNum(this.active - 1) :
      this.gotoNum(this.products.length - 1);
  }

  public gotoNext(): void {
    this.active < this.products.length - 1 ?
      this.gotoNum(this.active + 1) :
      this.gotoNum(0);
  }

  private gotoNum(number): void {

    this.active = number;

    this.prev = this.active - 1 === -1 ?
      this.products.length - 1 : this.active - 1;

    this.next =
      this.active + 1 === this.products.length ?
        0 : this.active + 1;

  }

}
