
import { Routes } from '@angular/router';

import { ProfileComponent, ProfileHomeComponent } from '../pages';

export const PROFILE_ROUTES: Routes = [{
  path: '',
  component: ProfileComponent,
  children: [
    {
      path: '',
      component: ProfileHomeComponent
    }
  ]
}];
