
import { Routes } from '@angular/router';
import { CorePageComponent } from '@app/core/pages/core-page/core-page.component';
import { NotFoundPageComponent } from '@app/core/pages/not-found-page/not-found-page.component';

export enum CORE_ROUTE_NAMES {
  OTHER = '**',
  NOT_FOUND = '404',
  SHOP = 'shop',
  MY_ACCOUNT = 'myaccount'
}

export const CORE_ROUTES: Routes = [
  {
    path: '',
    component: CorePageComponent,
    children: [
      {
        path: '',
        redirectTo: CORE_ROUTE_NAMES.SHOP,
        pathMatch: 'full'
      }, {
        path: CORE_ROUTE_NAMES.SHOP,
        loadChildren: '@app/shop/shop.module#ShopModule'
      }, {
        path: CORE_ROUTE_NAMES.MY_ACCOUNT,
        loadChildren: '@app/my-account/my-account.module#MyAccountModule'
      }, {
        path: CORE_ROUTE_NAMES.OTHER,
        redirectTo: CORE_ROUTE_NAMES.NOT_FOUND,
        pathMatch: 'full'
      }, {
        path: CORE_ROUTE_NAMES.NOT_FOUND,
        component: NotFoundPageComponent
      }
    ]
  }
];
