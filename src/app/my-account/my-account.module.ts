
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyAccountComponent } from './pages/my-account/my-account.component';
import { MyAccountHomeComponent } from './pages/my-account-home/my-account-home.component';

import { MyAccountRoutingModule } from './my-account-routing.module';

@NgModule({
  declarations: [
    MyAccountComponent,
    MyAccountHomeComponent
  ],
  imports: [
    CommonModule,
    MyAccountRoutingModule
  ]
})
export class MyAccountModule { }
