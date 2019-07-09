
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

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

import { COMPONENTS } from './components';
import { PIPES } from './pipes';

@NgModule({
  declarations: [
    ...COMPONENTS,
    ...PIPES
  ],
  imports: [
    CommonModule, // TODO investigate
    BrowserAnimationsModule, // TODO investigate the importing order
    HttpClientModule, // TODO investigate the importing order
    FormsModule,
    ReactiveFormsModule,
    ...MATERIAL_MODULES
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    ...MATERIAL_MODULES,
    ...COMPONENTS,
    ...PIPES
  ],
  entryComponents: [
  ]
})
export class SharedModule { }
