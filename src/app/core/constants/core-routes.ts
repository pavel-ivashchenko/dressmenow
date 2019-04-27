
import { Routes } from '@angular/router';
import { CorePageComponent } from '@app/core/pages/core-page/core-page.component';
import { NotFoundPageComponent } from '@app/core/pages/not-found-page/not-found-page.component';

export enum CORE_ROUTE_NAMES {
  OTHER = '**',
  NOT_FOUND = '404'
}

export const CORE_ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: CorePageComponent,
        pathMatch: 'full'
      },
      {
        path: CORE_ROUTE_NAMES.OTHER,
        redirectTo: CORE_ROUTE_NAMES.NOT_FOUND,
        pathMatch: 'full'
      },
      {
        path: CORE_ROUTE_NAMES.NOT_FOUND,
        component: NotFoundPageComponent
      }
    ]
  }
];
