
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared/shared.module';
import { ShopRoutingModule } from '@app/shop/shop-routing.module';

import { ShopComponent, ShopHomeComponent } from './pages';

@NgModule({
  declarations: [
    ShopComponent,
    ShopHomeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ShopRoutingModule
  ]
})
export class ShopModule { }
