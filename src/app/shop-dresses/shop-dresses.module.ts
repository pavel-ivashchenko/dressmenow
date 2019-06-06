
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopDressesRoutingModule } from './shop-dresses-routing.module';

import { ShopDressesPageComponent } from './pages/shop-dresses-page/shop-dresses-page.component';

@NgModule({
  declarations: [ShopDressesPageComponent],
  imports: [
    CommonModule,
    ShopDressesRoutingModule
  ]
})
export class ShopDressesModule { }
