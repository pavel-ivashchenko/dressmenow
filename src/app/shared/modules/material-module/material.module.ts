
import { NgModule } from '@angular/core';

import {
  MatSelectModule, MatDialogModule, MatButtonModule, MatSnackBarModule,
  MatInputModule, MatCheckboxModule, MatTooltipModule
} from '@angular/material';

const MODULES = [
  MatSelectModule,
  MatDialogModule,
  MatButtonModule,
  MatSnackBarModule,
  MatInputModule,
  MatCheckboxModule,
  MatTooltipModule
];

@NgModule({
  imports: MODULES,
  exports: MODULES
})
export class MaterialModule {};
