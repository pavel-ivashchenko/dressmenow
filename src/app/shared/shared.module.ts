
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatSelectModule,
  MatDialogModule,
  MatButtonModule,
  MatSnackBarModule
} from '@angular/material';

const MATERIAL_MODULES = [
  MatSelectModule,
  MatDialogModule,
  MatButtonModule,
  MatSnackBarModule
]

import { COMPONENTS } from './components';
import { PIPES } from './pipes';

@NgModule({
  declarations: [
    ...COMPONENTS,
    ...PIPES
  ],
  imports: [
    CommonModule,
    ...MATERIAL_MODULES
  ],
  exports: [
    ...MATERIAL_MODULES,
    ...COMPONENTS,
    ...PIPES
  ],
  entryComponents: [
  ]
})
export class SharedModule { }
