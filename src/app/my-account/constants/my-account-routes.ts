
import { Routes } from '@angular/router';

import { MyAccountComponent } from '../pages/my-account/my-account.component';
import { MyAccountHomeComponent } from '../pages/my-account-home/my-account-home.component';

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
  children: [{
      path: MY_ACCOUNT_ROUTE_NAMES.ORDERS,
      loadChildren: '@app/orders/orders.module#OrdersModule'
    }, {
      path: '',
      component: MyAccountHomeComponent
    }]
}];

