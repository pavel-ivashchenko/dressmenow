
export * from './main-header/main-header.module';
export * from './material-module/material.module';

import { MainHeaderModule } from './main-header/main-header.module';
import { MaterialModule } from './material-module/material.module';

export const MODULES = [
  MainHeaderModule,
  MaterialModule
];
