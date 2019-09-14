
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MY_ACCOUNT_ROUTES } from './constants';

@NgModule({
  imports: [ RouterModule.forChild(MY_ACCOUNT_ROUTES) ],
  providers: [],
  exports: [ RouterModule ]
})
export class MyAccountRoutingModule { }
