
import { Routes } from '@angular/router';

import { ShopDressesComponent, ShopDressesHomeComponent } from '../pages';

export const SHOP_DRESSES_ROUTES: Routes = [{
  path: '',
  component: ShopDressesComponent,
  children: [
    {
      path: '',
      component: ShopDressesHomeComponent
    }
  ]
}];
