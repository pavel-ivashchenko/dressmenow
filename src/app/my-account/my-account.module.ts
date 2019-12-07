
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared/shared.module';

import { MyAccountRoutingModule } from './my-account-routing.module';

// components
import {
  MyAccountOrdersComponent, MyAccountRecentlyViewedComponent,
  MyAccountPersonalInfoComponent, MyAccountBalanceComponent
} from './components';
import { MyAccountComponent, MyAccountHomeComponent } from './pages';

@NgModule({
  declarations: [
    MyAccountRecentlyViewedComponent,
    MyAccountOrdersComponent,
    MyAccountComponent,
    MyAccountHomeComponent,
    MyAccountPersonalInfoComponent,
    MyAccountBalanceComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MyAccountRoutingModule
  ]
})
export class MyAccountModule { }
