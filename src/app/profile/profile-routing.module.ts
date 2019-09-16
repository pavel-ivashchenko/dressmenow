
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PROFILE_ROUTES } from './constants';

@NgModule({
  imports: [ RouterModule.forChild(PROFILE_ROUTES) ],
  providers: [],
  exports: [ RouterModule ]
})
export class ProfileRoutingModule {
}
