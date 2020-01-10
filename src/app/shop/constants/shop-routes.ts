
import { Routes } from '@angular/router';

import { ShopComponent, ShoesComponent } from '../pages';

export enum SHOP_ROUTE_NAMES {
  SHOES = 'shoes'
}

export const SHOP_ROUTES: Routes = [{
  path: '',
  component: ShopComponent,
  children: [
    {
      path: SHOP_ROUTE_NAMES.SHOES,
      component: ShoesComponent
    }, {
      path: '',
      redirectTo: SHOP_ROUTE_NAMES.SHOES,
      pathMatch: 'full'
    }
  ]
}];
