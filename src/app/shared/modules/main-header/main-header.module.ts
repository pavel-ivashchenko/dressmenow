
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainHeaderComponent } from './main-header.component';
import { CartButtonComponent } from './components';
import { MaterialModule } from './../material-module/material.module';

@NgModule({
  declarations: [
    CartButtonComponent,
    MainHeaderComponent
  ],
  imports: [ CommonModule, MaterialModule ],
  exports: [ MainHeaderComponent ],
  entryComponents: [ ]
})
export class MainHeaderModule { }
