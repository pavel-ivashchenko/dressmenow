
import { Routes } from '@angular/router';

import { ContentPageComponent } from '../pages/content-page/content-page.component';

export enum CONTENT_ROUTE_NAMES {
  CLOTHING = 'clothing'
}

export const CONTENT_ROUTES: Routes = [{
  path: '',
  component: ContentPageComponent,
  children: [{
    path: '',
    redirectTo: CONTENT_ROUTE_NAMES.CLOTHING, // INVESTIGATE
    pathMatch: 'full'
  }, {
    path: CONTENT_ROUTE_NAMES.CLOTHING,
    // loadChildren: './../content-detail/content-detail.module#ContentDetailModule',
  }]
}];
