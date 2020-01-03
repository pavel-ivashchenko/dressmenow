
import { Routes } from '@angular/router';

import { ShopComponent, ShopHomeComponent, ShowcaseComponent } from '../pages';

export enum SHOP_ROUTE_NAMES {
  SHOWCASE = 'showcase'
}

export const SHOP_ROUTES: Routes = [{
  path: '',
  component: ShopComponent,
  children: [
    {
      path: SHOP_ROUTE_NAMES.SHOWCASE,
      component: ShowcaseComponent
    }, {
      path: '',
      component: ShopHomeComponent
    }
  ]
}];
