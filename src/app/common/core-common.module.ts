
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared/shared.module';

import { HeaderComponent } from './components/header/header.component';
import { CartModalComponent } from './components/header/modals/cart-modal/cart-modal.component';

@NgModule({
  declarations: [
    HeaderComponent,
    CartModalComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  entryComponents: [
    CartModalComponent
  ],
  exports: [
    HeaderComponent,
    CartModalComponent
  ]
})
export class CoreCommonModule { }
