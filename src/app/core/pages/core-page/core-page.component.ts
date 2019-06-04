
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { mainPageSlides } from '@app/core/models';
import { SliderConf } from '@app/shared/interfaces';

@Component({
  selector: 'app-core-page',
  templateUrl: './core-page.component.html',
  styleUrls: ['./core-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CorePageComponent implements OnInit {

  public mainPageSlides: SliderConf[] = mainPageSlides;

  constructor() { }

  ngOnInit() { }

}
