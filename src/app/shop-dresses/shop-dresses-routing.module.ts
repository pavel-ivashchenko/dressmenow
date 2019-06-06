
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SHOP_DRESSES_ROUTES } from './constants/shop-dresses-routes';

@NgModule({
  imports: [ RouterModule.forChild(SHOP_DRESSES_ROUTES) ],
  providers: [],
  exports: [ RouterModule ]
})
export class ShopDressesRoutingModule {
}
