
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SHOP_ROUTES } from './constants';

@NgModule({
  imports: [ RouterModule.forChild(SHOP_ROUTES) ],
  providers: [],
  exports: [ RouterModule ]
})
export class ShopRoutingModule {
}
