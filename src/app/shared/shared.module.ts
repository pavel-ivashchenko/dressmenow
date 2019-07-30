
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  MatSelectModule,
  MatDialogModule,
  MatButtonModule,
  MatSnackBarModule,
  MatInputModule
} from '@angular/material';

const MATERIAL_MODULES = [
  MatSelectModule,
  MatDialogModule,
  MatButtonModule,
  MatSnackBarModule,
  MatInputModule
];

import { COMPONENTS, ENTRY_COMPONENTS } from './components';
import { PIPES } from './pipes';
import { DIRECTIVES } from './directives';

@NgModule({
  declarations: [
    ...COMPONENTS,
    ...PIPES,
    ...DIRECTIVES
  ],
  imports: [
    CommonModule, // TODO investigate usage and where to import
    FormsModule,
    ReactiveFormsModule,
    ...MATERIAL_MODULES
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    ...MATERIAL_MODULES,
    ...COMPONENTS,
    ...PIPES,
    ...DIRECTIVES
  ],
  entryComponents: [
    ...ENTRY_COMPONENTS
  ]
})
export class SharedModule { }
