
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared/shared.module';

import { MyAccountRoutingModule } from './my-account-routing.module';

// COMPONENTS

import {
  MyAccountRecentlyViewedComponent,
  MyAccountPersonalInfoComponent, MyAccountBalanceComponent, MyAccountInfoBlockComponent
} from './components';

import { MyAccountComponent, MyAccountHomeComponent } from './pages';

@NgModule({
  declarations: [
    MyAccountRecentlyViewedComponent,
    MyAccountComponent,
    MyAccountHomeComponent,
    MyAccountPersonalInfoComponent,
    MyAccountBalanceComponent,
    MyAccountInfoBlockComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MyAccountRoutingModule
  ]
})
export class MyAccountModule { }
