
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared/shared.module';

import { MyAccountRoutingModule } from './my-account-routing.module';

import { MyAccountComponent, MyAccountHomeComponent } from './pages';

@NgModule({
  declarations: [
    MyAccountComponent,
    MyAccountHomeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MyAccountRoutingModule
  ]
})
export class MyAccountModule { }
