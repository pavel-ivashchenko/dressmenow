
import { Routes } from '@angular/router';

import { ShopDressesPageComponent } from '../pages/shop-dresses-page/shop-dresses-page.component';

export const SHOP_DRESSES_ROUTES: Routes = [{
  path: '',
  component: ShopDressesPageComponent,
  pathMatch: 'full'
}];
