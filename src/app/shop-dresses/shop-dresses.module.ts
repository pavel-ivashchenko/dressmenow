
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopDressesRoutingModule } from './shop-dresses-routing.module';

import { ShopDressesComponent, ShopDressesHomeComponent } from './pages';

@NgModule({
  declarations: [
    ShopDressesComponent,
    ShopDressesHomeComponent
  ],
  imports: [
    CommonModule,
    ShopDressesRoutingModule
  ]
})
export class ShopDressesModule { }
