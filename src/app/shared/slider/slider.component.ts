
import { Component, OnInit, Input } from '@angular/core';
import { SliderConf } from '@app/core/interfaces';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {

  @Input() sliderConf: SliderConf[];

  constructor() { }

  ngOnInit() { }

}
