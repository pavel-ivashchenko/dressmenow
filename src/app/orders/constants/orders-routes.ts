
import { Routes } from '@angular/router';

import { OrdersComponent, OrdersHomeComponent } from '../pages';

export enum ORDERS_ROUTE_NAMES { }

export const ORDERS_ROUTES: Routes = [{
  path: '',
  component: OrdersComponent,
  children: [
    {
      path: '',
      component: OrdersHomeComponent
    }
  ]
}];
