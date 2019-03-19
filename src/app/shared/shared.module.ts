
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SliderComponent } from './slider/slider.component';
import { BackToTopComponent } from './back-to-top/back-to-top.component';
import { DialogComponent } from './dialog/dialog.component';

@NgModule({
  declarations: [
    SliderComponent,
    BackToTopComponent,
    DialogComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SliderComponent,
    BackToTopComponent,
    DialogComponent
  ],
  entryComponents: [
    DialogComponent
  ]
})
export class SharedModule { }
