
import { Routes } from '@angular/router';

import { ShopComponent, ShopHomeComponent } from '../pages';

export enum SHOP_ROUTE_NAMES {
  DRESSES = 'dresses',
  ACCESSORIES = 'accessories'
}

export const SHOP_ROUTES: Routes = [{
  path: '',
  component: ShopComponent,
  children: [
    {
      path: SHOP_ROUTE_NAMES.DRESSES,
      loadChildren: '@app/shop-dresses/shop-dresses.module#ShopDressesModule'
    }, {
      path: '',
      component: ShopHomeComponent
    }
  ]
}];
