
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { COMPONENTS, ENTRY_COMPONENTS } from './components';
import { PIPES } from './pipes';
import { DIRECTIVES } from './directives';
import { VALIDATORS } from './validators';
import { MODULES } from './modules';

@NgModule({
  declarations: [
    ...COMPONENTS,
    ...PIPES,
    ...DIRECTIVES,
    ...VALIDATORS
  ],
  imports: [
    CommonModule, // TODO investigate usage and where to import
    FormsModule,
    ReactiveFormsModule,
    ...MODULES
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    ...MODULES,
    ...COMPONENTS,
    ...PIPES,
    ...DIRECTIVES,
    ...VALIDATORS
  ],
  entryComponents: [
    ...ENTRY_COMPONENTS
  ]
})
export class SharedModule { }
