
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { COMPONENTS } from './components';
import { PIPES } from './pipes';

@NgModule({
  declarations: [
    ...COMPONENTS,
    ...PIPES
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ...COMPONENTS,
    ...PIPES
  ],
  entryComponents: [
  ]
})
export class SharedModule { }
