
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared/shared.module';

import { HeaderComponent } from './components/header/header.component';
import { CartModalComponent } from './components/header/modals/cart-modal/cart-modal.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    HeaderComponent,
    CartModalComponent,
    FooterComponent
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
    CartModalComponent,
    FooterComponent
  ]
})
export class CoreCommonModule { }
