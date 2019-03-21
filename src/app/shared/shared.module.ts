
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SliderComponent } from './slider/slider.component';
import { BackToTopComponent } from './back-to-top/back-to-top.component';

@NgModule({
  declarations: [
    SliderComponent,
    BackToTopComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SliderComponent,
    BackToTopComponent
  ],
  entryComponents: [
  ]
})
export class SharedModule { }
