
import { Component } from '@angular/core';
import { mainPageSlides } from '@app/core/models';
import { SliderConf } from '@app/shared/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public mainPageSlides: SliderConf[] = mainPageSlides;

}
