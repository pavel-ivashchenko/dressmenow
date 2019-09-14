
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ORDERS_ROUTES } from './constants';

@NgModule({
  imports: [ RouterModule.forChild(ORDERS_ROUTES) ],
  providers: [],
  exports: [ RouterModule ]
})
export class OrdersRoutingModule { }
