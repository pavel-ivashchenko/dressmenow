
import { Routes } from '@angular/router';

import { MyAccountComponent, MyAccountHomeComponent } from '../pages';

export enum MY_ACCOUNT_ROUTE_NAMES {
  ORDERS = 'orders',
  REVIEWS = 'reviews',
  LOVES = 'loves',
  WISHLISTS = 'wishlists',
  CREDIT = 'credit',
  PROFILE = 'profile'
}

export const MY_ACCOUNT_ROUTES: Routes = [{
  path: '',
  component: MyAccountComponent,
  children: [
    {
      path: MY_ACCOUNT_ROUTE_NAMES.ORDERS,
      loadChildren: '@app/orders/orders.module#OrdersModule'
    }, {
      path: '',
      component: MyAccountHomeComponent
    }
  ]
}];

