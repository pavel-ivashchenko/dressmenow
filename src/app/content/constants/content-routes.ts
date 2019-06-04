
import { Routes } from '@angular/router';

import { ContentPageComponent } from '../pages/content-page/content-page.component';

export enum CONTENT_ROUTE_NAMES {
  DRESSES = 'dresses',
  ACCESSORIES = 'accessories'
}

export const CONTENT_ROUTES: Routes = [{
  path: '',
  component: ContentPageComponent,
  children: [{
    path: '',
    redirectTo: CONTENT_ROUTE_NAMES.DRESSES,
    pathMatch: 'full'
  }, {
    path: CONTENT_ROUTE_NAMES.DRESSES,
    loadChildren: '../../content-dresses/content-dresses.module#ContentDressesModule'
  }]
}];
