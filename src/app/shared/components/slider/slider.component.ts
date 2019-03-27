
import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { SliderConf } from '@app/shared/interfaces';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SliderComponent implements OnInit {

  @Input() sliderConf: SliderConf[];
  public currSlide: SliderConf;

  constructor() { }

  ngOnInit() {
    this.setInitSlide();
  }

  public setInitSlide(): void {
    this.currSlide = this.sliderConf[0];
  }

}
