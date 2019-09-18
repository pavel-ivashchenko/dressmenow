import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-carousel-simple',
  templateUrl: './carousel-simple.component.html',
  styleUrls: ['./carousel-simple.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarouselSimpleComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
