
import { Routes } from '@angular/router';

import { ShopPageComponent } from '../pages/shop-page/shop-page.component';

export enum SHOP_ROUTE_NAMES {
  DRESSES = 'dresses',
  ACCESSORIES = 'accessories'
}

export const SHOP_ROUTES: Routes = [{
  path: '',
  component: ShopPageComponent,
  children: [{
    path: SHOP_ROUTE_NAMES.DRESSES,
    loadChildren: '@app/shop-dresses/shop-dresses.module#ShopDressesModule'
  }]
}];
