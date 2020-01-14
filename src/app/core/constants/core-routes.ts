
import { Routes } from '@angular/router';
import { CorePageComponent, NotFoundPageComponent, MainPageComponent } from '@app/core/pages';

export enum CORE_ROUTE_NAMES {
  OTHER = '**',
  NOT_FOUND = '404',
  SHOP = 'shop',
  MY_ACCOUNT = 'my-account'
}

export const CORE_ROUTES: Routes = [
  {
    path: '',
    component: MainPageComponent,
    pathMatch: 'full'
  }, {
    path: CORE_ROUTE_NAMES.OTHER,
    component: CorePageComponent,
    children: [
      {
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
